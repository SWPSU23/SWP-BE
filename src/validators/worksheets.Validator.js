const queries = require('../queries/queryModal');
const pool = require('../services/query.Service');

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
                global.logger.error(`Validation - Role ${data.role} has existed`);
                throw new Error(`Role ${data.role} has 3 worker in this sheet`);
            }
        }
        // check guard has 2 worker in this sheet
        if (data.role === 'guard') {
            if (worksheet_role.length >= 2) {
                global.logger.error(`Validation - Role ${data.role} has existed`);
                throw new Error(`Role ${data.role} has 2 worker in this sheet`);
            }
        }
        // check employee has a worksheet in this sheet
        const worksheet_employee = await pool
            .getData(
                queries.Worksheet.checkEmployeeHasWorksheetInSheet,
                [
                    data.worksheet.employee,
                    data.worksheet.date,
                    data.worksheet.sheet_id
                ]
            );
        if (worksheet_employee.length > 0) {
            global.logger.error(`Validation - Employee ${data.worksheet.employee} has a worksheet in this sheet`);
            throw new Error(`Employee ${data.worksheet.employee} has a worksheet in this sheet`);
        }
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
            throw new Error(`Worksheet ${id} has been started`);
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