const pool = require('../services/queryHelper').getPool();
const joi = require('joi');
const queries = require('../queries/queryModal');
const time = require('../utilities/timeHelper');

const worksheetSchema = joi.object({
    employee_id: joi.number().required(),
    sheet_id: joi.number().required(),
    date: joi.string().required(),
    coefficient: joi.number().default(0),
    status: joi.string().default('pending')
})

const createWorksheet = (data) => {
    const query = queries.Worksheet.createWorksheet;
    const role = data.role;
    const { error, value } = worksheetSchema.validate(data.worksheet);
    if (error) {
        throw new error("Invalid data");
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
                        global.logger.error("Error create worksheet: " + error);
                        reject(error);
                    } else {
                        global.logger.info("Create worksheet without coefficient successfully");
                        global.logger.info("Worksheet id ", results.insertId + "Sheet_id ", value.sheet_id + "Role", role)
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
                                    // update coefficient to worksheet table
                                    pool.query(queries.Worksheet.updateWorksheet, [coefficient, worksheetId], (error, results) => {
                                        if (error) {
                                            global.logger.error("Error update coefficient: " + error);
                                            reject(error);
                                        } else {
                                            global.logger.info("Update coefficient successfully", results);
                                        }
                                    })
                                    // create check in out record
                                    pool.query(queries.CheckInOut.createCheckInOut,
                                        [value.employee_id,
                                            worksheetId]
                                        , (error, results) => {
                                            if (error) {
                                                global.logger.error("Error create check in out: " + error);
                                                reject(error);
                                            } else {
                                                global.logger.info("Create check in out successfully", results);
                                            }
                                        })
                                }
                            })
                    }
                })
            resolve({ message: "Create worksheet successfully" });
        })
    }
}

const getWorkSheetOfWeek = (start_date, end_date, role) => {
    const query = queries.Worksheet.getWorkSheetOfWeek(start_date, end_date, role);
    global.logger.info(query)
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
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
                        sheet_id: element.sheet_id,
                        day: time.timeStampToDate(element.day),
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
    getWorkSheetOfWeek,
    updateWorksheet,
    deleteWorksheet,
    searchWorksheetBy,
    getWorksheetDetail
}