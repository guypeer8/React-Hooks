const redis = require('./client');

const redisPromise = {
    hgetall: key => (
        new Promise((resolve, reject) =>
            redis.hgetall(key, (err, records) => {
                if (err)
                    return reject(err);

                const data = Object
                    .values(records || {})
                    .map(recordString =>
                        JSON.parse(recordString)
                    );

                resolve(data);
            })
        )
    ),

    hget: (key, id) => (
        new Promise((resolve, reject) =>
            redis.hget(key, id, (err, record) =>
                err ? reject(err) : resolve(JSON.parse(record || '{}'))
            )
        )
    ),

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

module.exports = redisPromise;
