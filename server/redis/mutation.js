const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Redis = require('./query');
const redisPromise = require('./config/promise');

const signUser = (username, password) => (
    existsUser(username)
        .then(exists =>
            exists ? null : hashPassword(password)
        ).then(hashedPwd => {
            if (!hashedPwd)
                return null;

            return redisPromise
                .hincrby('user_id', 'id')
                .then(id => {
                    const token = signJWT({id, username});
                    return redisPromise.hset('users', id, {
                        id,
                        username,
                        password: hashedPwd,
                        token,
                    });
                });
        })
);

const loginUser = (username, password) => (
    compareHash(username, password)
        .then(({ user, match }) =>
            match ? user : null
        )
);

const authenticateUser = token => (
    verifyJWT(token)
        .then(({ id, username }) => ({
            user: { id, username },
            authenticated: true,
        }))
        .catch(() => ({
            user: null,
            authenticated: false,
        }))
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
    authenticateUser,
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
            });
    })
);

const signJWT = ({ id, username }) => {
    const token = jwt.sign({
        id,
        username,
    }, 'secret', {
        expiresIn: '1d',
    });

    return token;
};

const verifyJWT = token => (
    new Promise((resolve, reject) => {
        jwt.verify(token, 'secret', (err, decoded) =>
            err ? reject(err) : resolve(decoded)
        );
    })
);
