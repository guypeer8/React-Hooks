const redis = require('./client');

const getTodos = () => (
    new Promise((resolve, reject) => {
        redis.hgetall('todos', (err, todosHash) => {
            if (err)
                return reject(err);

            const todos = Object
                .values(todosHash || {})
                .map(todoString =>
                    JSON.parse(todoString)
                );

            resolve(todos);
        });
    })
);

const getTodo = id => (
    new Promise((resolve, reject) => {
        redis.hget('todos', id, (err, todo) =>
            err ? reject(err) : resolve(JSON.parse(todo || '{}'))
        );
    })
);

module.exports = {
    getTodo,
    getTodos,
};