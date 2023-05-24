const path = require('path');
const Joi = require('joi');
require('dotenv').config({ path: path.join(__dirname, '../../.env.' + 'development') });
const envVarsSchema = Joi.object()
    .keys({
        // app environment
        NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
        HOST_URL: Joi.string().required().description('Database host name'),
        HOST_PORT: Joi.number().default(8080),
        // jwt config
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description('minutes after which reset password token expires'),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
            .default(10),
        // redis config
        REDIS_URL: Joi.string().required().description('Redis url'),
        // mysql config
        MYSQL_HOST: Joi.string().required().description('Database host name'),
        MYSQL_PORT: Joi.number().default(3306).description('Database port'),
        MYSQL_USERNAME: Joi.string().required().description('Database user name'),
        MYSQL_PASSWORD: Joi.string().required().description('Database password'),
        MYSQL_DATABASE: Joi.string().required().description('Database name'),
        // session config
        SESSION_SECRET: Joi.string().required().description('Session secret key'),

    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    isDev: envVars.NODE_ENV === 'development',
    url: envVars.HOST_URL,
    port: envVars.HOST_PORT,
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,

    },
    mySql: {
        host: envVars.MYSQL_HOST,
        port: envVars.MYSQL_PORT,
        user: envVars.MYSQL_USERNAME,
        password: envVars.MYSQL_PASSWORD,
        database: envVars.MYSQL_DATABASE,
    },
    redis: {
        url: envVars.REDIS_URL,
    },
    session: {
        secret: envVars.SESSION_SECRET
    }
}
