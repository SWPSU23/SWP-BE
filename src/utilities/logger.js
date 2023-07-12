const winston = require('winston')
const time = require('./timeHelper')
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: `./logs/${time.getNowDate()}.log`,
        }),
    ],
})
module.exports = logger