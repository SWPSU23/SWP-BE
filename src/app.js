const config = require('./configs')
const cluster = require('cluster')
const os = require('os')
const express = require('express')
const session = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis').default
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./utilities/swagger')
const apiRoute = require('./routes/index')
require('./utilities/logger')
const redisClient = redis.createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`,
    password: config.redis.password,
    database: config.redis.sessionDatabase,
})
redisClient.connect()

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
    app.use(
        session({
            secret: config.session.secret,
            resave: false,
            saveUninitialized: true,
            store: new RedisStore({ client: redisClient }),
        })
    )
    app.use(cors())
    app.use(express.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    // Define your routes and middleware
    app.use(
        '/v1/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, {
            explorer: true,
        })
    )
    app.use('/v1', apiRoute)

    // Start the Express server
    app.listen(port, () => {
        global.logger.info(`Worker ${process.pid} running on port: ${port}`)
    })
}
