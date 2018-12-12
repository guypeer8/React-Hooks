const TodoQuery = require('./query');
const redis = require('./client');

const addTodo = text => (
    redisPromise
        .hincrby('todo_id', 'id')
        .then(id =>
            redisPromise.hset('todos', id, {
                id,
                text,
                completed: false,
            })
        )
);

const editTodo = (id, text) => (
    TodoQuery
        .getTodo(id)
        .then(todo =>
            redisPromise.hset('todos', id, {
                ...todo,
                text,
            })
        )
);

const toggleTodo = id => (
    TodoQuery
        .getTodo(id)
        .then(todo =>
            redisPromise.hset('todos', id, {
                ...todo,
                completed: !todo.completed,
            })
        )
);

const deleteTodo = id =>
    redisPromise.hdel('todos', id);

const deleteCompletedTodos = () => (
    TodoQuery
        .getTodos()
        .then(todos =>
            todos
                .filter(({ completed }) => completed)
                .map(({ id }) => id)
        )
        .then(deleteTodos)
);

const deleteTodos = ids =>
    Promise.all(ids.map(id => deleteTodo(id)));

module.exports = {
    addTodo,
    editTodo,
    toggleTodo,
    deleteTodo,
    deleteCompletedTodos,
};

const redisPromise = {
    hset: (key, id, data) => (
        new Promise((resolve, reject) =>
            redis.hset(key, id, JSON.stringify(data), err =>
                err ? reject(err) : resolve(data)
            )
        )
    ),
    hdel: (key, id) => (
        new Promise((resolve, reject) =>
            redis.hdel(key, id, err =>
                err ? reject(err) : resolve({id})
            )
        )
    ),
    hincrby: (key, id, score = 1) => (
        new Promise((resolve, reject) =>
            redis.hincrby(key, id, score, (err, data) =>
                err ? reject(err) : resolve(data)
            )
        )
    ),
};
