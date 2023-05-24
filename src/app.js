const config = require('./configs');
const cluster = require('cluster');
const os = require('os');
const express = require('express');
// eslint-disable-next-line no-unused-vars
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const apiRoute = require('./routes/index')
const winston = require('winston');
const time = require('./utilities/timeHelper');
// eslint-disable-next-line no-unused-vars
const pool = require('./services/queryHelper');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `../logs/${time.getNow()}.log` }),
    ],
});
// setup parallel
if (cluster.isMaster) {
    if (config.ISDEV) {
        for (let i = 0; i < os.cpus().length; i++) {
            cluster.fork();
        }
    } else {
        cluster.fork();
    }
} else {
    // run server
    // connect to db
    // pool.connect()
    //     .then(() => {
    //         logger.info(`${time.getNow()}: Worker ${process.pid} connected to db`);
    //     })
    //     .catch((err) => {
    //         logger.error(`${time.getNow()}: Worker ${process.pid} could not connect to db`);
    //         logger.error(err);
    //     });

    // create express app
    const app = express();
    const port = config.ISDEV ? 8080 : config.HOST_PORT;
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // Define your routes and middleware
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/api/v1', apiRoute);

    // Start the Express server
    app.listen(port, () => {
        logger.info(`${time.getNow()}: Worker ${process.pid} running on ${port}`);
    });
}