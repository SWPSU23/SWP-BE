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
// import socket io
const socket = require('socket.io')
// import express
const express = require('express')
// using express session to store session
const session = require('express-session')
// import http server
const { createServer } = require('http')
// import redis store for session
const RedisStore = require('connect-redis').default
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('../utilities/swagger')
const apiRoute = require('../routes/index')
// require('./utilities/tester')

// create express app
const app = express()
const server = createServer(app)
// create socket io
const io = new socket.Server(server, {
    cors: {
        origin: 'https://www.piesocket.com',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    },
})
// import socket io handler
const onConnection = require('../handlers/onConnection.handler')
// session middleware
const sessionMiddleware = session({
    secret: global.config.session.secret,
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({
        client: global.redisClient,
        // ttl 1 month
        ttl: 2592000,
    }),
})
app.use(sessionMiddleware)
io.engine.use(sessionMiddleware)
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
io.of('socket').on('connection', (socket) => {
    onConnection(io, socket)
})
require('./schedule')
// Start the server using the 'server' instance
server.listen(global.config.port, () => {
    global.logger.info(
        `Worker ${process.pid} running on port: ${global.config.port}`
    )
})
