const queries = require('../queries/queryModal');
const pool = require('../services/queryHelper').getPool();

const createWorksheet = (data) => {
    // check if worksheet is exist
    return new Promise((resolve, reject) => {
        global.logger.info(`Validation - Check worksheet exist of role : ${JSON.stringify(data.role)}`);
        // handle promise
        const validationPromises = [];
        // check role has worksheet in this sheet or not
        validationPromises.push(
            new Promise((resolve, reject) => {
                pool.query(queries.Worksheet.checkRoleHasWorksheetInSheet,
                    [data.role,
                    data.worksheet.date,
                    data.worksheet.sheet_id],
                    (error, results) => {
                        if (error) {
                            global.logger.error(`Validation - Error query check worksheet exist: ${error}`)
                            reject(error);
                        } else {
                            // check role has worksheet in this sheet or not
                            if (results.length > 0) {
                                // check cashier has 3 worksheet in this sheet or not
                                if (data.role === 'cashier') {
                                    if (results.length >= 3) {
                                        global.logger.error(`Validation - Cashier has 3 worksheet in this sheet: ${JSON.stringify(results)}`);
                                        reject({ message: 'Cashier has enough employee in this sheet' });
                                    } else {
                                        global.logger.info(`Validation - Cashier has not enough employee in this sheet: ${JSON.stringify(results)}`);
                                        resolve();
                                    }
                                }
                                // check guard has 2 worksheet in this sheet or not
                                if (data.role === 'guard') {
                                    if (results.length >= 2) {
                                        global.logger.error(`Validation - Guard has 2 worksheet in this sheet: ${JSON.stringify(results)}`);
                                        reject({ message: 'Guard has enough employee in this sheet' });
                                    } else {
                                        global.logger.info(`Validation - Guard has not enough employee in this sheet: ${JSON.stringify(results)}`);
                                        resolve();
                                    }
                                }
                            } else {
                                resolve();
                            }
                        }
                    })
            })
        );
        // check employee has worksheet in this sheet or not
        validationPromises.push(
            new Promise((resolve, reject) => {
                pool.query(queries.Worksheet.checkEmployeeHasWorksheetInSheet,
                    [data.worksheet.employee_id,
                    data.worksheet.date,
                    data.worksheet.sheet_id],
                    (error, results) => {
                        if (error) {
                            global.logger.error(`Validation - Error query check worksheet exist: ${error}`)
                            reject(error);
                        } else {
                            if (results.length > 0) {
                                // insert data to worksheet table
                                global.logger.info(`Validation - Employee has worksheet in this sheet: ${JSON.stringify(results)}`);
                                reject({ message: 'Employee has worksheet in this sheet' });
                            } else {
                                global.logger.info(`Validation - Employee has not worksheet in this sheet`);
                                resolve();
                            }
                        }
                    })
            })
        )

        Promise.all(validationPromises).then(() => {
            resolve();
        }).catch((error) => {
            reject(error);
        })
    })
}

const deleteWorksheet = (id) => {
    return new Promise((resolve, reject) => {
        // get status to check can delete or not
        pool.query(queries.Worksheet.getWorksheetDetail,
            [id],
            (error, results) => {
                if (error) {
                    global.logger.info(`Validation - Error query get worksheet detail: ${error}`);
                    return reject(error);
                } else {
                    const status = results[0].status;
                    global.logger.info(`Validation - Status of worksheet: ${status}`);
                    if (status === 'not started') {
                        global.logger.info('Validation - Can delete worksheet');
                        resolve();
                    } else if (status === 'working') {
                        global.logger.info('Validation - Can not delete worksheet which is working');
                        reject({ message: 'Can not delete worksheet which is started' });
                    } else {
                        global.logger.info('Validation - Can not delete worksheet which is finished');
                        reject({ message: 'Can not delete worksheet which is finished' });
                    }
                }

            })
    })
}

module.exports = {
    createWorksheet,
    deleteWorksheet
}