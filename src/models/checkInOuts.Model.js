const queries = require('../queries/queryModal');
const pool = require('../services/queryHelper').getPool();
const time = require('../utilities/timeHelper');


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
                                global.logger.info("Update worksheet status successfully");
                                resolve(results);
                            }
                        })
                    resolve(results);
                }
            })
    })
}

const updateCheckOut = (worksheet_id) => {
    // get current time 
    const checkOut = {
        check_out_at: time.getNow()
    }
    // update check out time
    return new Promise((resolve, reject) => {
        pool.query(queries.CheckInOut.updateCheckInOut,
            [checkOut, worksheet_id],
            (error, results) => {
                if (error) {
                    global.logger.error(error);
                    reject(error);
                } else {
                    global.logger.info("Update check out successfully");

                    // update worksheet status
                    // pool.query(queries.Worksheet.getWorksheetDetail, [worksheet_id], (error, results) => {
                    //     if (error) {
                    //         global.logger.error("Error get worksheet detail: " + error);
                    //     } else {
                    //         // let worksheet_status;
                    //         // // sheet time
                    //         // const sheet_time = {
                    //         //     start_time: time.timeStampToHours(results[0].start_time),
                    //         //     end_time: time.timeStampToHours(results[0].end_time)
                    //         // };
                    //         // global.logger.info('sheet time: ' + sheet_time)
                    //         // // get check in out time
                    //         // const check_in_out_time = {
                    //         //     check_in_at: time.timeStampToHours(results[0].check_in_at),
                    //         //     check_out_at: time.timeStampToHours(results[0].check_out_at)
                    //         // }
                    //         // global.logger.info('check in out time: ' + check_in_out_time)
                    //         // // check valid check in out time

                    //     }
                    // })
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
                global.logger.error("Error delete check in out: " + error);
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