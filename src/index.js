// init global config
const config = require('./configs')
// init global logger
require('./utilities/logger')
// init global redis client
const redis = require('redis')
const redisClient = redis.createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`,
    password: config.redis.password,
    database: config.redis.sessionDatabase,
})
redisClient.connect()
global.redisClient = redisClient
global.config = config
// init express app
require('./app')
// init socket.io
require('./socket')
global.logger.info('App started')
