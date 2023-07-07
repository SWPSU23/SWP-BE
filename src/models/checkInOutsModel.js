const queries = require('../queries/queryModal');
const joi = require('joi');
const pool = require('../services/queryHelper').getPool();
const time = require('../utilities/timeHelper');

const schemaCheckInOut = joi.object({
    employee_id: joi.number().required(),
    check_in_at: joi.string().default(time.getNow()),
    check_out_at: joi.string().default(null),
    sheet_id: joi.number().required()
})

const createCheckInOut = (data) => {
    const query = queries.CheckInOut.createCheckInOut;
    const { error, value } = schemaCheckInOut.validate(data);
    if (error) {
        throw error;
    } else {
        return new Promise((resolve, reject) => {
            pool.query(query,
                [value.employee_id, value.check_in_at, value.check_out_at, value.sheet_id],
                (err, results) => {
                    if (err) {
                        global.logger.error("Failed to query from db", err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
        })
    }
}

const getListCheckInOut = () => {
    const query = queries.CheckInOut.getListCheckInOut;
    return new Promise((resolve, reject) => {
        pool.query(query, (err, results) => {
            if (err) {
                global.logger.error("Failed to query from db", err);
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

const updateCheckInOut = (data, id) => {
    const query = queries.CheckInOut.updateCheckInOut;
    const { error, value } = schemaCheckInOut.validate(data);
    if (error) {
        throw error;
    } else {
        return new Promise((resolve, reject) => {
            pool.query(query,
                [value.employee_id, value.check_in_at, value.check_out_at, value.sheet_id, id],
                (err, results) => {
                    if (err) {
                        global.logger.error("Failed to query from db", err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
        })
    }
}

const deleteCheckInOut = (id) => {
    const query = queries.CheckInOut.deleteCheckInOut;
    return new Promise((resolve, reject) => {
        pool.query(query, [id], (err, results) => {
            if (err) {
                global.logger.error("Failed to query from db", err);
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

const getCheckInOutDetail = (id) => {
    const query = queries.CheckInOut.getCheckInOutDetail;
    return new Promise((resolve, reject) => {
        pool.query(query, [id], (err, results) => {
            if (err) {
                global.logger.error("Failed to query from db", err);
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}



module.exports = {
    createCheckInOut,
    getListCheckInOut,
    updateCheckInOut,
    deleteCheckInOut,
    getCheckInOutDetail
}