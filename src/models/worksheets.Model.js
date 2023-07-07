const pool = require('../services/queryHelper').getPool();
const joi = require('joi');
const queries = require('../queries/queryModal');
const time = require('../utilities/timeHelper');

const worksheetSchema = joi.object({
    employee_id: joi.number().required(),
    sheet_id: joi.number().required(),
    day: joi.string().required(),
    status: joi.string().default('pending')
})

const createWorksheet = (data) => {
    const query = queries.Worksheet.createWorksheet;
    const { error, value } = worksheetSchema.validate(data);
    if (error) {
        throw new error("Invalid data");
    } else {
        return new Promise((resolve, reject) => {
            pool.query(query,
                [value.employee_id, value.sheet_id, value.day, value.status],
                (error, results) => {
                    if (error) {
                        global.logger.error("Error create worksheet: " + error);
                        reject(error);
                    } else {
                        global.logger.info("Create worksheet successfully");
                        resolve(results);
                    }
                })
        })
    }
}

const getListWorksheet = () => {
    const query = queries.Worksheet.getListWorksheet;
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                global.logger.error("Error get list worksheet: " + error);
                reject(error);
            } else {
                global.logger.info("Get list worksheet successfully");
                const data = [];
                // convert time stamp to date
                results.forEach(element => {
                    data.push({
                        id: element.id,
                        employee_id: element.employee_id,
                        sheet_id: element.sheet_id,
                        day: time.timeStampToDate(element.day),
                        status: element.status
                    })
                })
                resolve(data);
            }
        })
    })
}

const updateWorksheet = (data, id) => {
    const query = queries.Worksheet.updateWorksheet;
    return new Promise((resolve, reject) => {
        pool.query(query, [data, id], (error, results) => {
            if (error) {
                global.logger.error("Error update worksheet: " + error);
                reject(error);
            } else {
                global.logger.info("Update worksheet successfully");
                resolve(results);
            }
        })
    })
}

const deleteWorksheet = (id) => {
    const query = queries.Worksheet.deleteWorksheet;
    return new Promise((resolve, reject) => {
        pool.query(query, [id], (error, results) => {
            if (error) {
                global.logger.error("Error delete worksheet: " + error);
                reject(error);
            } else {
                global.logger.info("Delete worksheet successfully");
                resolve(results);
            }
        })
    })
}

const searchWorksheetBy = (searchBy, keywords) => {
    const query = queries.Worksheet.searchWorksheetBy(searchBy, keywords);
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                global.logger.error("Error search worksheet: " + error);
                reject(error);
            } else {
                global.logger.info("Search worksheet successfully");
                resolve(results);
            }
        })
    })
}

const getWorksheetDetail = (id) => {
    const query = queries.Worksheet.getWorksheetDetail;
    return new Promise((resolve, reject) => {
        pool.query(query, [id], (error, results) => {
            if (error) {
                global.logger.error("Error get worksheet detail: " + error);
                reject(error);
            } else {
                global.logger.info("Get worksheet detail successfully");
                resolve(results);
            }
        })
    })
}



module.exports = {
    createWorksheet,
    getListWorksheet,
    updateWorksheet,
    deleteWorksheet,
    searchWorksheetBy,
    getWorksheetDetail
}