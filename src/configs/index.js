const path = require('path')
const Joi = require('joi')
require('dotenv').config({
    path: path.join(__dirname, '../../.env.' + process.env.NODE_ENV),
})
const envVarsSchema = Joi.object()
    .keys({
        HOST_URL: Joi.string().required().description('Database host name'),
        HOST_PORT: Joi.number().default(8080),
        // redis config
        REDIS_HOST: Joi.string().required().description('Redis host'),
        REDIS_PORT: Joi.number().default(6379).description('Redis port'),
        REDIS_PASSWORD: Joi.string().required().description('Redis password'),
        REDIS_SESSION_DB: Joi.number().default(0).description('Redis session'),
        REDIS_FILE_DB: Joi.number().default(1).description('Redis file'),
        REDIS_NOTIFICATION_DB: Joi.number().default(2).description('Redis notification'),
        // mysql config
        MYSQL_HOST: Joi.string().required().description('Database host name'),
        MYSQL_PORT: Joi.number().default(3306).description('Database port'),
        MYSQL_USERNAME: Joi.string()
            .required()
            .description('Database user name'),
        MYSQL_PASSWORD: Joi.string()
            .required()
            .description('Database password'),
        MYSQL_DATABASE: Joi.string().required().description('Database name'),
        // session config
        SESSION_SECRET: Joi.string()
            .required()
            .description('Session secret key'),
        // mail config
        MAIL_HOST: Joi.string().required().description('Mail host'),
        MAIL_PORT: Joi.number().default(587).description('Mail port'),
        MAIL_ACCOUNT: Joi.string().required().description('Mail account'),
        MAIL_PASSWORD: Joi.string().required().description('Mail password'),
    })
    .unknown()

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
    env: process.env.NODE_ENV,
    isDev: process.env.NODE_ENV === 'development',
    url: envVars.HOST_URL,
    port: envVars.HOST_PORT,
    mySql: {
        host: envVars.MYSQL_HOST,
        port: envVars.MYSQL_PORT,
        user: envVars.MYSQL_USERNAME,
        password: envVars.MYSQL_PASSWORD,
        database: envVars.MYSQL_DATABASE,
    },
    redis: {
        host: envVars.REDIS_HOST,
        port: envVars.REDIS_PORT,
        password: envVars.REDIS_PASSWORD,
        sessionDB: envVars.REDIS_SESSION_DB,
        fileDB: envVars.REDIS_FILE_DB,
        notificationDB: envVars.REDIS_NOTIFICATION_DB,
    },
    session: {
        secret: envVars.SESSION_SECRET,
    },
    mail: {
        host: envVars.MAIL_HOST,
        port: envVars.MAIL_PORT,
        user: envVars.MAIL_ACCOUNT,
        password: envVars.MAIL_PASSWORD,
    },
}
