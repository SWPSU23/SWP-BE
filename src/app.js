require('./utilities/logger')
const cluster = require('cluster')
const os = require('os')
const express = require('express')
const session = require('express-session')
const { createServer } = require('http')
const RedisStore = require('connect-redis').default
const bodyParser = require('body-parser')
// eslint-disable-next-line no-unused-vars
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./utilities/swagger')
const apiRoute = require('./routes/index')
// require('./utilities/tester')

// setup parallel
if (cluster.isMaster) {
    const isDev = global.config.isDev
    global.logger.info(
        `server is running on ${isDev ? 'Development' : 'Production'} mode`
    )
    const numWorkers = isDev ? 1 : os.cpus().length
    global.logger.info(`Master cluster setting up ${numWorkers} workers...`)
    for (let i = 0; i < numWorkers; i++) {
        cluster.fork()
    }
    cluster.on('online', (worker) => {
        global.logger.info(`Worker ${worker.process.pid} is online`)
    })
    cluster.on('exit', (worker, code, signal) => {
        global.logger.info(
            `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
        )
        // 'Starting a new worker'
        cluster.fork()
    })
} else {
    // debug break point
    global.logger.info(`Worker ${process.pid} started`)
    // create express app
    const app = express()
    const port = global.config.port
    const server = createServer(app)
    app.use(
        session({
            secret: global.config.session.secret,
            resave: false,
            saveUninitialized: true,
            store: new RedisStore({
                client: global.redisClient,
                // ttl 1 month
                ttl: 2592000
            }),
        })
    )
    app.use(
        cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
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
    server.listen(port, () => {
        global.logger.info(`Worker ${process.pid} running on port: ${port}`)
    })
    global.server = server
}
