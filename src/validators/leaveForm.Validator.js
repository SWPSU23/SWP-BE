const time = require('../utilities/timeHelper');
const queries = require('../queries/queryModal');
const pool = require('../services/query.Service');

const validadteCrateLeaveForm = async (values) => {
    try {
        // check day leave is not in the past
        const start_date_of_leave = time.timeStampToDate(values.start_date_of_leave);
        const end_date_of_leave = time.timeStampToDate(values.end_date_of_leave);
        if (start_date_of_leave < time.getNowDate() || end_date_of_leave < time.getNowDate()) {
            global.logger.error(`ValidationError: Leave day is in the past`);
            throw new Error(`ValidationError: Leave day is in the past`);
        } else if (start_date_of_leave > end_date_of_leave) {
            global.logger.error(`ValidationError: Start date is greater than end date`);
            throw new Error(`ValidationError: Start date is greater than end date`);
        }
        // check employee has engough leave day
        const employee_detail = await pool
            .getData(
                queries.Employee.getEmployeeDetails,
                [
                    values.employee_id
                ]
            );
        const leave_day_used = time.dateToTimeStamp(values.end_date_of_leave) - time.dateToTimeStamp(values.start_date_of_leave);

        if (employee_detail[0].leave_day_of_year < leave_day_used / 86400 * 8) {
            global.logger.error(`ValidationError: Employee does not have enough leave day`);
            throw new Error(`ValidationError: Employee does not have enough leave day`);
        }
        return values;
    } catch (error) {
        global.logger.error(`ValidationError: ${error.message}`);
        throw error;
    }
};

const valiateUpdateLeaveForm = async (values, id) => {
    try {
        // check status valid
        if (values.status !== 'approved' && values.status !== 'rejected') {
            global.logger.error(`ValidationError: Status is not valid`);
            throw new Error(`ValidationError: Status is not valid`);
        }
        // check status has been changed
        const leaveForm_detail = await pool
            .getData(
                queries.LeaveManagement.getLeaveFormById,
                [
                    id
                ]
            );
        if (leaveForm_detail[0].status !== "waiting") {
            global.logger.error(`ValidationError: Leave form has been updated`);
            throw new Error(`ValidationError: Leave form has been updated`);
        }
        return values;
    } catch (error) {
        global.logger.error(`ValidationError: ${error.message}`);
        throw error;
    }
}


module.exports = {
    validadteCrateLeaveForm,
    valiateUpdateLeaveForm
}