const uuid = require('uuid/v1');

const TodoQuery = require('./query');
const client = require('./client');

const addTodo = text => (
    new Promise((reject, resolve) => {
        const id = uuid();
        const newTodo = {
            id,
            text,
            completed: false,
        };
        const todoString = JSON.stringify(newTodo);

        client.hset('todos', id, todoString, err =>
            err ? reject(err) : resolve(newTodo)
        );
    })
);

const editTodo = (id, text) => (
    new Promise(async (reject, resolve) => {
        try {
            const todo = await TodoQuery.getTodo(id);
            const editedTodo = {
                ...todo,
                text,
            };
            const todoString = JSON.stringify(editedTodo);

            client.hset('todos', id, todoString, err =>
                err ? reject(err) : resolve(editedTodo)
            );
        }
        catch (err) {
            reject(err);
        }
    })
);

const toggleTodo = id => (
    new Promise(async (reject, resolve) => {
        try {
            const todo = await TodoQuery.getTodo(id);
            const toggledTodo = {
                ...todo,
                completed: !todo.completed,
            };
            const todoString = JSON.stringify(toggledTodo);

            client.hset('todos', id, todoString, err =>
                err ? reject(err) : resolve(toggledTodo)
            );
        }
        catch (err) {
            reject(err);
        }
    })
);

const deleteTodo = id => (
    new Promise(async (reject, resolve) => {
        try {
            client.hdel('todos', id, err =>
                err ? reject(err) : resolve({ id })
            );
        }
        catch (err) {
            reject(err);
        }
    })
);

const deleteCompletedTodos = () => (
    new Promise(async (reject, resolve) => {
        try {
            const todos = await TodoQuery.getTodos();
            const completedTodosIds = todos
                .filter(({ completed }) => completed)
                .map(({ id }) => id);

            await deleteTodos(completedTodosIds);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    })
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
