const pool = require('../services/queryHelper').getPool();
const queries = require('../queries/queryModal');
const time = require('../utilities/timeHelper');
const moment = require('moment');

const updateCheckIn = (worksheet_id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.Worksheet.getWorksheetDetail, [worksheet_id], (error, results) => {
            if (error) {
                global.logger.error("Validation - Error get worksheet detail: " + error);
                reject(error);
            } else {
                const checkIn = moment(time.getNow(), 'HH:mm:ss');
                global.logger.info("Validation - Check in time: " + time.timeStampToHours(checkIn));
                const start_time = moment(results[0].start_time, 'HH:mm:ss')
                global.logger.info("Validation - Start time: " + time.timeStampToHours(start_time));
                global.logger.info("Validation - The earliest time to check in: " + time.timeStampToHours(start_time.clone().subtract(30, 'minutes')));
                global.logger.info("Validation - The latest time to check in: " + time.timeStampToHours(start_time.clone().add(10, 'minutes')));
                // check if check in time is valid
                if (checkIn > start_time.clone().add(10, 'minutes') || checkIn < start_time.clone().subtract(30, 'minutes')) {
                    global.logger.error("Validation - Can't check in right now: ");
                    reject({ message: "Can't check in right now" });
                } else {
                    global.logger.info("Validation - Can check in right now: ");
                    resolve(time.timeStampToHours(checkIn));
                }
            }
        })
    })
}

// const updateCheckOut = (worksheet_id) => {

// }

module.exports = {
    updateCheckIn
}