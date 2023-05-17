const mysql = require('mysql2');
require('dotenv').config();

const connect = mysql.createConnection({
    host: process.env.DB.HOST,
    user: process.env.DB.USERNAME,
    password: process.env.DB.PASSWORD,
    database: process.env.DB.DATABASE
})

module.exports = connect;