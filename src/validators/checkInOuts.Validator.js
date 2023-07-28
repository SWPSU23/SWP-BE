const pool = require('../services/query.Service');
const queries = require('../queries/queryModal');
const time = require('../utilities/timeHelper');

const validateUpdateCheckIn = async (employee_id) => {
    try {
        const data = {}
        const list_worksheet_by_employee_of_today = await pool
            .getData(
                queries.Worksheet.getWorkSheetByDateAndEmployee(employee_id, time.getNowDate()),
                []
            );
        if (list_worksheet_by_employee_of_today.length === 0) {
            throw new Error('ValidationError: Employee has not worked today');
        } else {
            // loop list worksheet of employee
            list_worksheet_by_employee_of_today.map((worksheet) => {
                let start_time = time.timeStampToHours(worksheet.start_time);
                let end_time = time.timeStampToHours(worksheet.end_time);
                // search sheet of employee
                if (time.validInRangeCheckInOut(start_time, end_time, time.getNowTime()) === true) {
                    // check employee has already checked in
                    if (worksheet.check_in_at !== null) {
                        throw new Error('ValidationError: Employee has already checked in');
                    }
                    data.worksheet_id = worksheet.id;
                    data.check_in = time.getNow();
                }
            })
        }
        if (data.worksheet_id === undefined) {
            throw new Error('ValidationError: Not start time to check in');
        } else {
            return data;
        }
    } catch (error) {
        global.logger.error("Validation - Error update check in: " + error);
        throw error;
    }
}

const validateUpdateCheckOut = async (employee_id) => {
    try {
        const data = {};
        const list_worksheet_by_employee_of_today = await pool
            .getData(
                queries.Worksheet.getWorkSheetByDateAndEmployee(employee_id, time.getNowDate()),
                []
            );
        // check employee has worked today
        if (list_worksheet_by_employee_of_today.length === 0) {
            throw new Error('ValidationError: Employee has not worked today');
        } else {
            // loop list worksheet of employees
            list_worksheet_by_employee_of_today.map((worksheet) => {
                const start_time = time.timeStampToHours(worksheet.start_time);
                const end_time = time.timeStampToHours(worksheet.end_time);
                // search sheet of employee
                if (time.validInRangeCheckInOut(start_time, end_time, time.getNowTime()) === true) {
                    // check employee has already checked out
                    if (worksheet.check_out_at !== null) {
                        throw new Error('ValidationError: Employee has already checked out');
                    }
                    // check employee has don't check in
                    if (worksheet.check_in_at === null) {
                        throw new Error('ValidationError: Employee has not checked in');
                    }
                    // check valid time to check out
                    if (time.validCheckOut(end_time, time.getNowTime()) === true) {
                        data.worksheet_id = worksheet.id;
                        data.check_out = time.getNow();
                    } else {
                        throw new Error('ValidationError: Can not check out now');
                    }

                }
            })

            // modify data
            if (data.worksheet_id === undefined) {
                throw new Error('ValidationError: Not start time to check out')
            } else {
                return data;
            }

        }
    } catch (error) {
        global.logger.error("Validation - Error update check out: " + error);
        throw error;
    }
}

module.exports = {
    validateUpdateCheckIn,
    validateUpdateCheckOut
}