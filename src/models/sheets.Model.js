const queries = require('../queries/queryModal');
const pool = require('../services/query.Service');
const joi = require('joi');
const time = require('../utilities/timeHelper');

const sheetSchema = joi.object({
    start_time: joi.string().required(),
    end_time: joi.string().required(),
    coefficient: joi.number().required()
})

const createSheet = async (data) => {
    try {
        const { error, value } = sheetSchema.validate(data);
        if (error) {
            global.logger.error(`Model - Error validate create sheet: ${error}`)
            throw new Error(error)
        } else {
            const results = await pool
                .setData(
                    queries.Sheet.createSheet,
                    [
                        value.start_time,
                        value.end_time,
                        value.coefficient
                    ]
                );
            global.logger.info(`Model - Create sheet successfully: ${results}`)
            return results
        }
    } catch (error) {
        global.logger.error(`Model - Error create sheet: ${error}`)
        throw new Error(error)
    }
}

const getListSheet = async () => {
    try {
        const results = await pool
            .getData(
                queries.Sheet.getListSheet
            );
        const data = results.map(item => ({
            id: item.id,
            start_time: time.timeStampToHours(item.start_time),
            end_time: time.timeStampToHours(item.end_time),
            coefficient: item.coefficient
        }))
        global.logger.info(`Model - Get list sheet successfully: ${results}`)
        return data;
    } catch (error) {
        global.logger.error(`Model - Error get list sheet: ${error}`)
        throw new Error(error)
    }
}

const updateSheet = async (data, id) => {
    try {
        const results = await pool
            .setData(
                queries.Sheet.updateSheet,
                [
                    data,
                    id
                ]
            );
        return results;
    } catch (error) {
        global.logger.error(`Model - Error update sheet: ${error}`)
        throw new Error(error)
    }
}

const deleteSheet = async (id) => {
    try {
        const results = await pool
            .setData(
                queries.Sheet.deleteSheet,
                [
                    id
                ]
            );
        return results;
    } catch (error) {
        global.logger.error(`Model - Error delete sheet: ${error}`)
        throw error
    }
}

module.exports = {
    createSheet,
    getListSheet,
    updateSheet,
    deleteSheet
}
