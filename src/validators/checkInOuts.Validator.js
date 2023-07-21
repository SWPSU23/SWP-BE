const pool = require('../services/query.Service');
const queries = require('../queries/queryModal');
const time = require('../utilities/timeHelper');
const moment = require('moment');


const validateUpdateCheckIn = async (employee_id) => {
    try {
        // search for worksheet of employee
        const date = time.getNowDate();
        const hours = time.getNowTime();
        const list_worksheet_of_day = await pool
            .getData(
                queries.Worksheet.getWorkSheetByDateAndEmployee(employee_id, date),
                []
            );
        // check if employee has worksheet today
        if (list_worksheet_of_day.length === 0) {
            global.logger.error("Validation - Employee has no worksheet today: ");
            throw new Error(`ValidationError: Employee has no worksheet today`);
        } else {
            list_worksheet_of_day.map((detail_worksheet_of_day) => {
                const start_time = time.timeStampToHours(detail_worksheet_of_day.start_time);
                // Convert the hours timestamp to 'HH:mm:ss' format

                // check if employee has worksheet in this time
                const earliest_time_to_check_in = moment(start_time, 'HH:mm:ss').subtract(30, 'minutes');
                const latest_time_to_check_in = moment(start_time, 'HH:mm:ss').add(10, 'minutes');

                // check if check in time is valid
                if (hours > earliest_time_to_check_in && hours < latest_time_to_check_in) {
                    return {
                        worksheet_id: detail_worksheet_of_day.id,
                        check_in: hours
                    };
                }
                // check if check in time is invalid
                global.logger.error("Validation - Can't check in right now: ");
                throw new Error(`ValidationError: Can't check in right now`);
            });
        }
    } catch (error) {
        global.logger.error(`Validation - Error query get worksheet detail: ${error}`);
        throw error;
    }
}


const validateUpdateCheckOut = async (employee_id) => {
    try {
        const date = time.getNowDate();
        const hours = time.getNowTime();
        const list_worksheet_of_day = await pool
            .getData(
                queries.Worksheet.getWorkSheetByDateAndEmployee(employee_id, date),
                []
            );
        // check if employee has worksheet today
        if (list_worksheet_of_day.length === 0) {
            global.logger.error("Validation - Employee has no worksheet today: ");
            throw new Error(`ValidationError: Employee has no worksheet today`);
        } else {
            list_worksheet_of_day.map((detail_worksheet_of_day) => {
                const end_time = time.timeStampToHours(detail_worksheet_of_day.end_time);
                // check if employee has worksheet in this time
                const earliest_time_to_check_out = moment(end_time, 'HH:mm:ss').subtract(10, 'minutes');
                const latest_time_to_check_out = moment(end_time, 'HH:mm:ss').add(30, 'minutes');
                // check if check out time is valid
                if (hours > earliest_time_to_check_out && hours < latest_time_to_check_out) {
                    return {
                        worksheet_id: detail_worksheet_of_day.id,
                        check_out: hours
                    };
                }
                // check if check out time is invalid
                global.logger.error("Validation - Can't check out right now: ");
                throw new Error(`ValidationError: Can't check out right now`);
            })
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