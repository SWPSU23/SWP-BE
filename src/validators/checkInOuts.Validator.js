const pool = require('../services/query.Service').getPool();
const queries = require('../queries/queryModal');
const time = require('../utilities/timeHelper');
const moment = require('moment');


const validateUpdateCheckIn = async (worksheet_id) => {
    try {
        const results = await pool
            .getData(
                queries.Worksheet.getWorksheetDetail,
                [worksheet_id]
            );
        // get current time set to check in
        const check_in = moment(time.getNow(), 'YYYY-MM-DD HH:mm:ss');
        global.logger.info(`Validation - Check in time: ${time.timeStampToHours(check_in)}`);
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
        if (check_in < start_time) {
            global.logger.error("Validation - Can't check out right now: ");
            throw { message: "Can't check in right now" };
        } else if (check_in > latest_time) {
            global.logger.error("Validation - Out of time to check in: ");
            throw { message: "Out of time to check in" };
        } else {
            global.logger.info("Validation - Can check in right now: ");
            return time.timeStampToDay(check_in);
        }
    } catch (error) {
        global.logger.error(`Validation - Error query get worksheet detail: ${error}`);
        throw error;
    }
}


const validateUpdateCheckOut = async (worksheet_id) => {
    try {
        const results = await pool
            .getData(
                queries.Worksheet.getWorksheetDetail,
                [worksheet_id]
            );
        const check_out = moment(time.getNow(), 'YYYY-MM-DD HH:mm:ss');
        global.logger.info(`Validation - Check out time: ${time.timeStampToHours(check_out)}`);
        // get start time
        const start_time = moment(results[0].end_time, 'YYYY-MM-DD HH:mm:ss')
        global.logger.info(`Validation - Start time: ${time.timeStampToHours(start_time)}`);
        // get latest time to check out
        const latest_time = start_time.clone().add(30, 'minutes');
        global.logger.info(`Validation - The latest time to check out: ${time.timeStampToHours(latest_time)}`);
        // check if check in time is valid
        if (check_out < start_time) {
            global.logger.error("Validation - Can't check out right now: ");
            throw ({ message: "Can't check out right now" });
        } else if (check_out > latest_time) {
            global.logger.error("Validation - Out of time to check out: ");
            throw ({ message: "Out of time to check out" });
        } else {
            global.logger.info("Validation - Can check out right now: ");
            return (time.timeStampToDay(check_out));
        }
    } catch (error) {
        global.logger.error(`Validation - Error query get worksheet detail: ${error}`);
        throw error;
    }
}

module.exports = {
    validateUpdateCheckIn,
    validateUpdateCheckOut
}