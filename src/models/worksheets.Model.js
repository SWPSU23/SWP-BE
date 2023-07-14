const pool = require('../services/queryHelper').getPool();
const joi = require('joi');
const queries = require('../queries/queryModal');
const time = require('../utilities/timeHelper');

const worksheetSchema = joi.object({
    employee_id: joi.number().required(),
    sheet_id: joi.number().required(),
    date: joi.string().required(),
    coefficient: joi.number().default(0),
    status: joi.string().default('not started')
})

const createWorksheet = (data) => {
    const query = queries.Worksheet.createWorksheet;
    const role = data.role;
    const { error, value } = worksheetSchema.validate(data.worksheet);
    if (error) {
        global.logger.error(`Model - Error validate worksheet: ${error}`)
        throw error({ message: error })
    } else {
        return new Promise((resolve, reject) => {
            // insert data to worksheet table
            pool.query(query,
                [
                    value.employee_id,
                    value.sheet_id,
                    value.date,
                    value.status
                ],
                (error, results) => {
                    if (error) {
                        global.logger.error(`Model - Error query create worksheet: ${error}`)
                        reject(error);
                    } else {
                        global.logger.info(`Model - Create worksheet successfully: ${results}`);
                        const worksheetId = results.insertId;
                        // get coefficient from sheet table\
                        pool.query(queries.Worksheet.getCoefficient,
                            [value.sheet_id,
                                worksheetId,
                                role],
                            (error, results) => {
                                if (error) {
                                    global.logger.error(error);
                                    reject(error);
                                } else {
                                    // check if day is special day set coefficient = 3
                                    let coefficient = {};
                                    if (results[0].isSpecialDay === 'yes') {
                                        coefficient = {
                                            coefficient: 3
                                        };
                                    } else {
                                        coefficient = {
                                            coefficient: results[0].coefficient
                                        };
                                    }
                                    global.logger.info("Model - Set coefficient", coefficient);
                                    // update coefficient to worksheet table
                                    pool.query(queries.Worksheet.updateWorksheet,
                                        [coefficient, worksheetId],
                                        (error, results) => {
                                            if (error) {
                                                global.logger.error(`Model - Error update coefficient: ${error}`);
                                                reject(error);
                                            } else {
                                                global.logger.info("Model - Update coefficient successfully", results);
                                            }
                                        })
                                    // create check in out record
                                    pool.query(queries.CheckInOut.createCheckInOut,
                                        [value.employee_id,
                                            worksheetId]
                                        , (error, results) => {
                                            if (error) {
                                                global.logger.error(`Model - Error create check in out: ${error}`);
                                                reject(error);
                                            } else {
                                                global.logger.info("Model - Create check in out successfully", results);
                                            }
                                        })
                                }
                            })
                    }
                })
            resolve("Create worksheet successfully");
        })
    }
}

const getWorkSheetOfWeek = (start_date, end_date, role) => {
    const query = queries.Worksheet.getWorkSheetOfWeek(start_date, end_date, role);
    global.logger.info(`Model - Query getWorkSheetOfWeek: ${query}`);
    return new Promise((resolve, reject) => {
        pool.query(query,
            (error, results) => {
                if (error) {
                    global.logger.error("Error get list worksheet: " + error);
                    reject(error);
                } else {
                    const data = [];
                    // convert time stamp to date
                    results.forEach(element => {
                        data.push({
                            id: element.id,
                            employee_id: element.employee_id,
                            employee_name: element.employee_name,
                            sheet_id: element.sheet_id,
                            date: time.timeStampToDate(element.date),
                            status: element.status
                        })
                    })
                    global.logger.info("Get list worksheet successfully", data);
                    resolve(data);
                }
            })
    })
}

const updateWorksheet = (data, id) => {
    const query = queries.Worksheet.updateWorksheet;
    return new Promise((resolve, reject) => {
        pool.query(query,
            [data, id],
            (error, results) => {
                if (error) {
                    global.logger.error(`Model - Error query update worksheet: ${error}`);
                    reject(error);
                } else {
                    global.logger.info(`Model - Update worksheet successfully: ${results}`);
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
                global.logger.error(`Model - Error query delete worksheet: ${error}`);
                reject(error);
            } else {
                global.logger.info(`Model - Delete worksheet successfully: ${results}`);
                resolve(results);
            }
        })
    })
}

const searchWorksheetBy = (searchBy, keywords) => {
    const query = queries.Worksheet.searchWorksheetBy(searchBy, keywords);
    global.logger.info(`Model - Query search worksheet: ${query}`);
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                global.logger.error(`Model - Error query search worksheet: ${error}`);
                reject(error);
            } else {
                global.logger.info(`Model - Search worksheet successfully: ${results}`);
                resolve(results);
            }
        })
    })
}

const getWorksheetDetail = (id) => {
    const query = queries.Worksheet.getWorksheetDetail;
    global.logger.info(`Model - Query get worksheet detail: ${query}`);
    return new Promise((resolve, reject) => {
        pool.query(query, [id], (error, results) => {
            if (error) {
                global.logger.error(`Model - Error query get worksheet detail: ${error}`);
                reject(error);
            } else {
                const data = [];
                // convert time stamp to date
                results.forEach(element => {
                    data.push({
                        id: element.id,
                        employee_id: element.employee_id,
                        employee_name: element.employee_name,
                        sheet_id: element.sheet_id,
                        date: time.timeStampToDate(element.date),
                        coefficient: element.coefficient,
                        check_in_at: time.timeStampToHours(element.check_in_at),
                        check_out_at: time.timeStampToHours(element.check_out_at),
                        start_time: time.timeStampToHours(element.start_time),
                        end_time: time.timeStampToHours(element.end_time),
                        status: element.status
                    })
                })
                global.logger.info(`Model - Get worksheet detail successfully: ${data}`);
                resolve(data);
            }
        })
    })
}



module.exports = {
    createWorksheet,
    getWorkSheetOfWeek,
    updateWorksheet,
    deleteWorksheet,
    searchWorksheetBy,
    getWorksheetDetail
}