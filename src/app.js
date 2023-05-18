const config = require('./configs');
const cluster = require('cluster');
const os = require('os');
const express = require('express');
// eslint-disable-next-line no-unused-vars
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const apiRoute = require('./routes/userRoute')
const winston = require('winston');
const time = require('./utilities/timeHelper');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `../logs/${time.getNow()}.log` }),
    ],
});
if (cluster.isMaster) {
    if (config.ISDEV) {
        for (let i = 0; i < os.cpus().length; i++) {
            cluster.fork();
        }
    } else {
        cluster.fork();
    }
} else {
    const app = express();
    const port = config.ISDEV ? 8080 : config.HOST_PORT;
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // Define your routes and middleware
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/api', apiRoute);

    // Start the Express server
    app.listen(port, () => {
        logger.info(`${time.getNow()}: Worker ${process.pid} running on ${port}`);
    });
}