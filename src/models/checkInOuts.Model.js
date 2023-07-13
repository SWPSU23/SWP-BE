const queries = require('../queries/queryModal');
const pool = require('../services/queryHelper').getPool();

const updateCheckIn = (worksheet_id, check_in_at) => {
    // get current time
    const checkIn = {
        check_in_at: check_in_at
    }
    // update check in 
    return new Promise((resolve, reject) => {
        pool.query(queries.CheckInOut.updateCheckInOut,
            [checkIn, worksheet_id],
            (error, results) => {
                if (error) {
                    global.logger.error(error);
                    reject(error);
                } else {
                    global.logger.info("Model - Update check in successfully" + results);
                    // update worksheet status to working
                    pool.query(queries.Worksheet.updateWorksheet,
                        [
                            { status: 'working' },
                            worksheet_id
                        ],
                        (error, results) => {
                            if (error) {
                                global.logger.error(error);
                                reject(error);
                            } else {
                                global.logger.info("Model - Update worksheet status successfully");
                                resolve(results);
                            }
                        })
                    resolve(results);
                }
            })
    })
}

const updateCheckOut = (worksheet_id, check_out_at) => {
    // get current time 
    const checkOut = {
        check_out_at: check_out_at
    }
    // update check out time
    return new Promise((resolve, reject) => {
        pool.query(queries.CheckInOut.updateCheckInOut,
            [
                checkOut,
                worksheet_id],
            (error, results) => {
                if (error) {
                    global.logger.error("Model - Error update check out: " + error);
                    reject(error);
                } else {
                    global.logger.info("Model - Update check out successfully" + results);
                    // update worksheet status to present
                    pool.query(queries.Worksheet.updateWorksheet,
                        [
                            { status: 'present' },
                            worksheet_id
                        ],
                        (error, results) => {
                            if (error) {
                                global.logger.error("Model - Error update worksheet status: " + error);
                                reject(error);
                            } else {
                                global.logger.info("Model - Update worksheet status successfully");
                                resolve(results);
                            }
                        })
                    resolve(results);
                }
            })
    })
}

const deleteCheckInOut = (worksheet_id) => {
    const query = queries.CheckInOut.deleteCheckInOut;
    return new Promise((resolve, reject) => {
        pool.query(query, [worksheet_id], (error, results) => {
            if (error) {
                global.logger.error("Model - Error delete check in out: " + error);
                reject(error);
            } else {
                global.logger.info("Delete check in out successfully");
                resolve(results);
            }
        })
    })
}



module.exports = {
    updateCheckIn,
    updateCheckOut,
    deleteCheckInOut
}