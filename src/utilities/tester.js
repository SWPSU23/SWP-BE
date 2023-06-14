// test redis

const redis = require('redis')
const config = require('../configs')

// Create a Redis client
const client = redis.createClient({
    url: `redis://${config.redis.host}:${config.redis.port}/${config.redis.fileDB}`,
    password: config.redis.password,
})
client.connect()
// test read and write
const test = async () => {
    await client.set('key', 'value');
    const value = await client.get('key');
    console.log(value);
}
test()