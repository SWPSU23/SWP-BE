const queries = require('../queries/queryModal');
const pool = require('../services/queryHelper').getPool();
const joi = require('joi');

const sheetSchema = joi.object({
    start_time: joi.string().required(),
    end_time: joi.string().required(),
    coficient: joi.number().required()
})

const createSheet = (data) => {
    const query = queries.Sheet.createSheet;
    const { error, value } = sheetSchema.validate(data);

    if (error) {
        global.logger.error('Error validate sheet: ', error)
        throw error
    } else {
        value.start_time = value.start_time.format('HH:mm:ss')
        value.end_time = value.end_time.format('HH:mm:ss')

        return new Promise((resolve, reject) => {
            pool.query(query,
                [value.start_time,
                value.end_time,
                value.coficient],
                (error, results) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(results)
                    }
                })
        })
    }
}

const getListSheet = () => {
    const query = queries.Sheet.getListSheet;
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

const updateSheet = (data, id) => {
    const query = queries.Sheet.updateSheet;
    return new Promise((resolve, reject) => {
        pool.query(query, [data, id], (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

const deleteSheet = (id) => {
    const query = queries.Sheet.deleteSheet;
    return new Promise((resolve, reject) => {
        pool.query(query, [id], (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = {
    createSheet,
    getListSheet,
    updateSheet,
    deleteSheet
}
