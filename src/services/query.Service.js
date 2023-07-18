const mysql = require('mysql2')
const configs = require('../configs')
let pool

const getPool = () => {
    if (!pool) {
        pool = mysql.createPool({
            host: configs.mySql.host,
            user: configs.mySql.user,
            password: configs.mySql.password,
            database: configs.mySql.database,
        })
    }
    return pool
}

const getData = (queryString, [...args]) => {
    return new Promise((resolve, reject) => {
        pool.query(queryString, args, (err, result) => {
            if (err) {
                return reject(err.message)
            } else {
                return resolve(result)
            }
        })
    })
}

const setData = (queryString, [...args]) => {
    return new Promise((resolve, reject) => {
        pool.query(queryString, args, (err, result) => {
            if (err) {
                global.logger.error(err.message)
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}
module.exports = {
    getPool,
    getData,
    setData
}
