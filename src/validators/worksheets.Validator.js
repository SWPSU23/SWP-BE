const queries = require('../queries/queryModal');
const pool = require('../services/query.Service');
const time = require(`../utilities/timeHelper`);

const validateCreateWorksheet = async (data) => {
    try {
        // check role has existed
        const worksheet_role = await pool
            .getData(
                queries.Worksheet.checkRoleHasWorksheetInSheet,
                [
                    data.role,
                    data.worksheet.date,
                    data.worksheet.sheet_id
                ]
            );
        // check cashier has 3 worker in this sheet
        if (data.role === 'cashier') {
            if (worksheet_role.length >= 3) {
                global.logger.error(`ValidationError: Role ${data.role} has existed`);
                throw new Error(`ValidationError: Role ${data.role} already has 3 worker `);
            }
        }
        // check guard has 2 worker in this sheet
        if (data.role === 'guard') {
            if (worksheet_role.length >= 2) {
                global.logger.error(`ValidationError: Role ${data.role} has existed`);
                throw new Error(`ValidationError: Role ${data.role} already has 2 worker `);
            }
        }
        // check employee has a worksheet in this sheet
        const worksheet_employee = await pool
            .getData(
                queries.Worksheet.checkEmployeeHasWorksheetInSheet,
                [
                    data.worksheet.employee_id,
                    data.worksheet.date,
                    data.worksheet.sheet_id
                ]
            );
        if (worksheet_employee.length > 0) {
            global.logger.error(`ValidationError: Employee already has worksheet`);
            throw new Error(`ValidationError: Employee already has worksheet`);
        }
        // check employee has leave day
        const list_leave_form = await pool
            .getData(
                queries.LeaveManagement.getLeaveFormByEmployee,
                [
                    data.worksheet.employee_id
                ]
            );
        list_leave_form.map((leave_detail) => {
            const start_date_of_leave = time.timeStampToDate(leave_detail.start_date);
            const end_date_of_leave = time.timeStampToDate(leave_detail.end_date);
            // check leave day is approved
            if (leave_detail.status === 'approved') {
                if (data.worksheet.date >= start_date_of_leave && data.worksheet.date <= end_date_of_leave) {
                    global.logger.error(`ValidationError: Employee ${data.worksheet.employee_id} has leave day`);
                    throw new Error(`ValidationError: Employee ${data.worksheet.employee_id} has leave day`);
                }
            }
        })
        return data;
    } catch (error) {
        global.logger.error(`Validation - Error validate create worksheet: ${error}`);
        throw error;
    }

}

const validateDeleteWorksheet = async (id) => {
    try {
        const worksheet_detail = await pool
            .getData(
                queries.Worksheet.getWorksheetDetail,
                [id]
            );
        if (worksheet_detail[0].status !== 'not started') {
            global.logger.error(`Validation - Worksheet ${id} has been started`);
            throw new Error(`ValidationError: Worksheet ${id} has been started`);
        }
        return id;
    } catch (error) {
        global.logger.error(`Validation - Error validate delete worksheet: ${error}`);
        throw error;
    }
}

module.exports = {
    validateCreateWorksheet,
    validateDeleteWorksheet
}