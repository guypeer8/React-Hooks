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
        new Promise((resolve, reject) => (
            redis.hget(key, id, (err, record) => {
                if (err)
                    return reject(err);

                const data = JSON.parse(record || '{}');

                if (data['password'])
                    delete data['password'];

                resolve(data);
            })
        ))
    ),

    hset: (key, id, data) => (
        new Promise((resolve, reject) => (
            redis.hset(key, id, JSON.stringify(data), err => {
                if (err)
                    return reject(err);

                if (data['password'])
                    delete data['password'];

                resolve(data);
            })
        ))
    ),

    hdel: (key, id) => (
        new Promise((resolve, reject) =>
            redis.hdel(key, id, err =>
                err ? reject(err) : resolve({ id })
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

    hmgetall: keys => (
        new Promise((resolve, reject) => {
            const dataByKey = {};

            const multi = redis.multi();
            keys.forEach(key => multi.hgetall(key));

            multi.exec((err, data) => {
                if (err)
                    return reject(err);

                data.forEach((hash, i) => {
                    const key = keys[i];
                    if (!hash)
                        return dataByKey[key] = [];

                    dataByKey[key] = Object.values(hash).map(value => {
                        try { return JSON.parse(value); }
                        catch (e) { return value; }
                    });
                });

                resolve(dataByKey);
            });
        })
    ),
};

(async () => {
    await redisPromise.hmgetall(['todos:6', 'todos:29', 'todos:14', 'todos:66', 'todos:31']);
})();

module.exports = redisPromise;
