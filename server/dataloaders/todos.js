const DataLoader = require('dataloader');
const redisPromise = require('../redis/config/promise');

const todosLoader = new DataLoader(async keys => {
    const todosByUser = await redisPromise.hmgetall(keys);
    return Object.values(todosByUser);
}, { cache: false });

module.exports = todosLoader;
