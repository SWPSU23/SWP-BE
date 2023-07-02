const config = require('./configs')
require('./utilities/logger')
const cluster = require('cluster')
const os = require('os')
const express = require('express')

const http = require('http')
const socketIO = require('socket.io')

const session = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis').default
const bodyParser = require('body-parser')
// eslint-disable-next-line no-unused-vars
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./utilities/swagger')
const apiRoute = require('./routes/index')
const redisClient = redis.createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`,
    password: config.redis.password,
    database: config.redis.sessionDatabase,
})
redisClient.connect()
require('./services/summaryService')
// require('./utilities/tester')

// setup parallel
if (cluster.isMaster) {
    const isDev = config.isDev
    const numWorkers = isDev ? 1 : os.cpus().length
    global.logger.info(`Master cluster setting up ${numWorkers} workers...`)
    for (let i = 0; i < numWorkers; i++) {
        cluster.fork()
    }
    cluster.on('online', (worker) => {
        global.logger.info(`Worker ${worker.process.pid} is online`)
    })
} else {
    // create express app
    const app = express()
    const port = config.port
    // Create an HTTP server and attach Socket.IO
    const server = http.createServer(app)
    const io = socketIO(server, {
        cors: {
            origin: '*',
        },
    })
    // register socket path /v1/socket
    io.of('/v1/socket').on('connection', (socket) => {
        global.logger.info('a user connected')
        socket.on('disconnect', () => {
            global.logger.info('user disconnected')
        })
    })
    app.use(
        session({
            secret: config.session.secret,
            resave: false,
            saveUninitialized: true,
            store: new RedisStore({ client: redisClient }),
        })
    )
    app.use(cors(
        {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }
    ))
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
    server.listen(port, () => {
        global.logger.info(`Worker ${process.pid} running on port: ${port}`)
    })
}
