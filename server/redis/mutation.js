const Query = require('./query');
const redisPromise = require('./config/promise');

const createUser = (username, password) => {
    existsUser(username)
        .then(exists => {
            if (exists)
                return false;

            return redisPromise
                .hincrby('user_id', 'id')
                .then(id =>
                    redisPromise.hset('users', id, {
                        id,
                        username,
                        password,
                    })
                );
        });
};

const addTodo = (user_id, text) => (
    redisPromise
        .hincrby('todo_id', 'id')
        .then(todo_id =>
            redisPromise.hset(`todos:${user_id}`, todo_id, {
                id,
                text,
                completed: false,
            })
        )
);

const editTodo = (user_id, todo_id, text) => (
    Query
        .getTodo(id)
        .then(todo =>
            redisPromise.hset(`todos:${user_id}`, todo_id, {
                ...todo,
                text,
            })
        )
);

const toggleTodo = (user_id, todo_id) => (
    Query
        .getTodo(id)
        .then(todo =>
            redisPromise.hset(`todos:${user_id}`, todo_id, {
                ...todo,
                completed: !todo.completed,
            })
        )
);

const deleteTodo = (user_id, todo_id) =>
    redisPromise.hdel(`todos:${user_id}`, todo_id);

const deleteCompletedTodos = user_id => (
    Query
        .getTodos(user_id)
        .then(todos =>
            todos
                .filter(({ completed }) => completed)
                .map(({ id }) => id)
        )
        .then(deleteTodos)
);

const deleteTodos = todo_ids => (
    Promise.all(
        todo_ids.map(todo_id =>
            deleteTodo(todo_id)
        )
    )
);

module.exports = {
    createUser,
    addTodo,
    editTodo,
    toggleTodo,
    deleteTodo,
    deleteCompletedTodos,
};

const existsUser = username => (
    Query
        .getUsers()
        .then(users =>
            users.filter(user =>
                user.username === username
            ).length > 0
        )
);
