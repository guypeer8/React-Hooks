const redis = require('redis');

const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
});

client.on('error', error =>
    console.error('Redis Error: ', error)
);

module.exports = client;
