const httpServer = require('http').createServer()
const { port, env, socketUrl, socketPort } = require('./src/configs')
const io = require('socket.io')(httpServer, {
    cors: {
        origin: '*',
    },
})
const redis = require('redis')
const redisClient = redis.createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`,
    password: config.redis.password,
    database: config.redis.sessionDatabase,
})