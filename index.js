// init global config
const config = require('./src/configs')
// init global logger
const logger = require('./src/services/logger.Service')
// init global redis client
const redis = require('redis')
const redisClient = redis.createClient({
  url: `redis://${config.redis.host}:${config.redis.port}`,
  password: config.redis.password,
  database: config.redis.sessionDatabase,
})
redisClient.connect()
redisClient.on('error', (err) => {
  // reconnect redis
  logger.error('Redis error: ', err)
  redisClient.quit()
  redisClient.connect()
})
global.redis = redis // set redis to global
global.redisClient = redisClient // set redis client to global
global.config = config // set config to global
global.logger = logger // set logger to global
// init app cluster
require('./src/apps/appCluster')
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