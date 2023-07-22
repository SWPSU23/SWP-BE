//setup global variables
global.config = require('../configs')
global.logger = require('../services/logger.Service')
global.redis = require('redis')
global.redisClient = global.redis.createClient({
    url: `redis://${global.config.redis.host}:${global.config.redis.port}`,
    password: global.config.redis.password,
    database: global.config.redis.sessionDatabase,
})
global.redisClient.connect()
global.redisClient.on('error', (err) => {
    // reconnect redis
    global.logger.error('Redis error: ', err)
    global.redisClient.quit()
    global.redisClient.connect()
})

const express = require('express')
const session = require('express-session')
const { createServer } = require('http')
const RedisStore = require('connect-redis').default
const bodyParser = require('body-parser')
// eslint-disable-next-line no-unused-vars
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('../utilities/swagger')
const apiRoute = require('../routes/index')
// require('./utilities/tester')

// create express app
const app = express()
const server = createServer(app)
app.use(
    session({
        secret: global.config.session.secret,
        resave: false,
        saveUninitialized: true,
        store: new RedisStore({
            client: global.redisClient,
            // ttl 1 month
            ttl: 2592000,
        }),
    })
)
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
)
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
    '/v1/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        explorer: true,
    })
)
app.use('/v1', apiRoute)

// Start the server using the 'server' instance
server.listen(global.config.port, () => {
    global.logger.info(`Worker ${process.pid} running on port: ${global.config.port}`)
})
global.server = server
