const queries = require('../queries/queryModal');
const pool = require('../services/queryHelper').getPool();
const joi = require('joi');
const time = require('../utilities/timeHelper');

const sheetSchema = joi.object({
    start_time: joi.string().required(),
    end_time: joi.string().required(),
    coefficient: joi.number().required()
})

const createSheet = (data) => {
    const query = queries.Sheet.createSheet;
    const { error, value } = sheetSchema.validate(data);
    if (error) {
        global.logger.error('Error validate sheet: ', error)
        throw error
    } else {
        global.logger.info('Validate sheet successfully', value)
        return new Promise((resolve, reject) => {
            pool.query(query,
                [value.start_time,
                value.end_time,
                value.coefficient],
                (error, results) => {
                    if (error) {
                        global.logger.error('Error create sheet: ', error)
                        reject(error)
                    } else {
                        global.logger.info('Create sheet successfully')
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
                global.logger.info('Error get list sheet: ', error)
                reject(error)
            } else {
                const data = [];
                results.forEach((element) => {
                    data.push({
                        id: element.id,
                        start_time: time.timeStampToHours(element.start_time),
                        end_time: time.timeStampToHours(element.end_time),
                        coefficient: element.coefficient
                    })
                })
                resolve(data)
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
