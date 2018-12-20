const rootDir = require('app-root-dir').get();
const { readFileSync } = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { join } = require('path');

const Redis = require('./query');
const redisPromise = require('./config/promise');

const JWT_SECRET = readFileSync(join(rootDir, 'bin', 'jwt_secret.pem'));

const signUser = (username, password, res) => (
    existsUser(username)
        .then(exists => (
            exists
                ? null
                : hashPassword(password)
        ))
        .then(hashedPwd => {
            if (!hashedPwd)
                return null;

            return redisPromise
                .hincrby('user_id', 'id')
                .then(id => {
                    setAuthCookie({ id, username }, res);
                    return redisPromise.hset('users', id, {
                        id,
                        username,
                        password: hashedPwd,
                    });
                });
        })
);

const loginUser = (username, password, res) => (
    compareHash(username, password)
        .then(({ user, match }) => {
            if (!(user && match))
                return null;

            setAuthCookie(user, res);
            return user;
        })
);

const addTodo = (user_id, text) => (
    redisPromise
        .hincrby('todo_id', 'id')
        .then(todo_id => {
            return redisPromise.hset(`todos:${user_id}`, todo_id, {
                id: todo_id,
                text,
                completed: false,
            });
        })
);

const editTodo = (user_id, todo_id, text) => (
    Redis
        .getTodo(user_id, todo_id)
        .then(todo => {
            return redisPromise.hset(`todos:${user_id}`, todo_id, {
                ...todo,
                text,
            });
        })
);

const toggleTodo = (user_id, todo_id) => (
    Redis
        .getTodo(user_id, todo_id)
        .then(todo => {
            return redisPromise.hset(`todos:${user_id}`, todo_id, {
                ...todo,
                completed: !todo.completed,
            });
        })
);

const deleteTodo = (user_id, todo_id) =>
    redisPromise.hdel(`todos:${user_id}`, todo_id);

const deleteCompletedTodos = user_id => (
    Redis
        .getTodos(user_id)
        .then(todos =>
            todos
                .filter(({ completed }) => completed)
                .map(({ id }) => id)
        )
        .then(todo_ids =>
            deleteTodos(user_id, todo_ids)
        )
);

const deleteTodos = (user_id, todo_ids) => (
    Promise.all(
        todo_ids.map(todo_id =>
            deleteTodo(user_id, todo_id)
        )
    )
);

module.exports = {
    signUser,
    loginUser,
    addTodo,
    editTodo,
    toggleTodo,
    deleteTodo,
    deleteCompletedTodos,
};

const getUserByUsername = username => (
    Redis
        .getUsers()
        .then(users =>
            users.find(user =>
                user.username === username
            )
        )
);

const existsUser = username => (
    getUserByUsername(username)
        .then(user => !!user)
);

const hashPassword = password => (
    new Promise((resolve, reject) => (
        bcrypt.genSalt(10, (err, salt) => (
            err
                ? reject(err)
                : bcrypt.hash(password, salt, (err, hash) => (
                    err ? reject(err) : resolve(hash)
                ))
        ))
    ))
);

const compareHash = (username, password) => (
    new Promise((resolve, reject) => {
        getUserByUsername(username)
            .then(user => {
                if (!user) {
                    return resolve({
                        user: null,
                        match: false,
                    });
                }

                bcrypt.compare(
                    password,
                    user.password,
                    (err, match) => {
                        if (err)
                            return reject(err);

                        delete user.password;
                        resolve({
                            user,
                            match,
                        });
                    }
                )
            })
            .catch(reject);
    })
);

const signJWT = ({ id, username }) => {
    const token = jwt.sign(
        { id, username },
        JWT_SECRET,
        { expiresIn: '1d' }
    );

    return token;
};

const setAuthCookie = ({ id, username }, res) => {
    const jwtEncoded = signJWT({ id, username });
    res.cookie('token', jwtEncoded, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 1d
    });
};
