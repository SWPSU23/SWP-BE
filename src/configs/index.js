const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env.' + 'development') });
const {
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    HOST_URL,
    JWT_SECRET,
    MYSQL_HOST,
    HOST_PORT,
    ISDEV,
} = process.env;

const mySQLConnectionConfig = {
    host: MYSQL_HOST,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
};

module.exports = {
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    HOST_URL,
    JWT_SECRET,
    MYSQL_HOST,
    HOST_PORT,
    ISDEV,
    mySQLConnectionConfig,
};