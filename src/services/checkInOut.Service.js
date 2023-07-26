const time = require('../utilities/timeHelper');
const pool = require('./query.Service');
const queries = require('../queries/queryModal');
// cashier don't check in sheet 1
const scanWorksheet = async (role, sheet) => {
    try {
        // get list worksheet of day by role
        const list_worksheet_by_date = await pool
            .getData(
                queries.Schedule.getWorkSheetOfDayByRole(role, time.getNowDate(), sheet),
                []
            );
        // check list worksheet is empty
        if (list_worksheet_by_date.length === 0) {
            global.logger.info('ValidationError: No workshet to day');
        } else {
            // loop list worksheet
            for (const worksheet of list_worksheet_by_date) {
                // check employee has already checked out or checked in
                if (worksheet.check_in_at === null || worksheet.check_out_at === null) {
                    // update status worksheet
                    await pool
                        .setData(
                            queries.Worksheet.updateWorksheet,
                            [
                                { status: 'absent' },
                                worksheet.id
                            ]
                        );
                    // handle delete leave day of employee
                    await pool
                        .setData(
                            queries.Employee.updateEmployeeDetail,
                            [
                                { leave_day: worksheet.leave_day - 8 },
                                worksheet.employee_id
                            ]
                        );
                } else {
                    // check valid check in time
                    const start_time = time.timeStampToHours(worksheet.start_time);
                    const check_in_at = time.timeStampToHours(worksheet.check_in_at);
                    if (time.validCheckIn(start_time, check_in_at) === false) {
                        // update status worksheet
                        await pool
                            .setData(
                                queries.Worksheet.updateWorksheet,
                                [
                                    { status: 'absent' },
                                    worksheet.id
                                ]
                            );
                        // handle delete leave day of employee
                        await pool
                            .setData(
                                queries.Employee.updateEmployeeDetail,
                                [
                                    { leave_day: worksheet.leave_day - 8 },
                                    worksheet.employee_id
                                ]
                            );
                    }
                }
            }
        }
    } catch (error) {
        global.logger.error(error);
        throw error;
    }
}

module.exports = {
    scanWorksheet
}