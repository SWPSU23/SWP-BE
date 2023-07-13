// init global config
const config = require('./configs')
// init global logger
const logger = require('./utilities/logger')
// init global redis client
const redis = require('redis')
const redisClient = redis.createClient({
  url: `redis://${config.redis.host}:${config.redis.port}`,
  password: config.redis.password,
  database: config.redis.sessionDatabase,
})
redisClient.connect()
global.redis = redis
global.redisClient = redisClient
global.config = config
global.logger = logger
// init express app
require('./app')

// init socket.io
require('./socket')
// init global error handler
let server = global.server
const exitHandler = () => {
  if (server) {
    server.close(() => {
      global.logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  global.logger.error("err:", error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});