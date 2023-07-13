const pool = require('../services/queryHelper').getPool();
const queries = require('../queries/queryModal');
const time = require('../utilities/timeHelper');
const moment = require('moment');

const updateCheckIn = (worksheet_id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.Worksheet.getWorksheetDetail, [worksheet_id], (error, results) => {
            if (error) {
                global.logger.error(`Validation - Error query get worksheet detail: ${error}`);
                reject(error);
            } else {
                // get current time
                const checkIn = moment(time.getNow(), 'YYYY-MM-DD HH:mm:ss');
                global.logger.info(`Validation - Check in time: ${time.timeStampToHours(checkIn)}`);
                // get start time
                const start_time = moment(results[0].start_time, 'YYYY-MM-DD HH:mm:ss')
                global.logger.info(`Validation - Start time: ${time.timeStampToHours(start_time)}`);
                // get earliest time to check in
                const earliest_time = start_time.clone().subtract(30, 'minutes');
                global.logger.info(`Validation - The earliest time to check in: ${time.timeStampToHours(earliest_time)}`);
                // get latest time to check in
                const latest_time = start_time.clone().add(10, 'minutes');
                global.logger.info(`Validation - The latest time to check in: ${time.timeStampToHours(latest_time)}`);
                // check if check in time is valid
                if (checkIn < start_time) {
                    global.logger.error("Validation - Can't check out right now: ");
                    reject({ message: "Can't check in right now" });
                } else if (checkIn > latest_time) {
                    global.logger.error("Validation - Out of time to check in: ");
                    reject({ message: "Out of time to check in" });
                } else {
                    global.logger.info("Validation - Can check in right now: ");
                    resolve(time.timeStampToDay(checkIn));
                }
            }
        })
    })
}

const updateCheckOut = (worksheet_id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.Worksheet.getWorksheetDetail, [worksheet_id], (error, results) => {
            if (error) {
                global.logger.error(`Validation - Error query get worksheet detail: ${error}`);
                reject(error);
            } else {
                // get current time
                const checkOut = moment(time.getNow(), 'YYYY-MM-DD HH:mm:ss');
                global.logger.info(`Validation - Check out time: ${time.timeStampToHours(checkOut)}`);
                // get start time
                const start_time = moment(results[0].end_time, 'YYYY-MM-DD HH:mm:ss')
                global.logger.info(`Validation - Start time: ${time.timeStampToHours(start_time)}`);
                // get latest time to check out
                const latest_time = start_time.clone().add(30, 'minutes');
                global.logger.info(`Validation - The latest time to check out: ${time.timeStampToHours(latest_time)}`);
                // check if check in time is valid
                if (checkOut < start_time) {
                    global.logger.error("Validation - Can't check out right now: ");
                    reject({ message: "Can't check out right now" });
                } else if (checkOut > latest_time) {
                    global.logger.error("Validation - Out of time to check out: ");
                    reject({ message: "Out of time to check out" });
                } else {
                    global.logger.info("Validation - Can check out right now: ");
                    resolve(time.timeStampToDay(checkOut));
                }
            }
        })
    })
}

module.exports = {
    updateCheckIn,
    updateCheckOut
}