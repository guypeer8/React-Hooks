const redisPromise = require('./config/promise');

const getUsers = () =>
    redisPromise.hgetall('users');

const getUser = user_id =>
    redisPromise.hget('users', user_id);

const getTodos = user_id =>
    redisPromise.hgetall(`todos:${user_id}`);

const getTodo = (user_id, todo_id) =>
    redisPromise.hget(`todos:${user_id}`, todo_id);

module.exports = {
    getUsers,
    getUser,
    getTodos,
    getTodo,
};
