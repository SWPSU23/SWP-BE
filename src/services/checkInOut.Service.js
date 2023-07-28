const time = require('../utilities/timeHelper');
const pool = require('./query.Service');
const queries = require('../queries/queryModal');
const notification = require('./notification.Service');
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
            global.logger.info('Today is not working day');
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
                    // get employee detail
                    const employee_detail = await pool
                        .getData(
                            queries.Employee.getEmployeeDetails,
                            [worksheet.employee_id]
                        );
                    // handle delete leave day of employee
                    await pool
                        .setData(
                            queries.Employee.updateEmployeeDetail,
                            [
                                { leave_day_of_year: employee_detail[0].leave_day_of_year - 8 },
                                worksheet.employee_id
                            ]
                        );
                    // send notification to employee
                    const noti = {
                        title: 'Absent',
                        content: `You are absent on ${time.getNowDate()}`
                    }
                    await notification.addNotification(noti, worksheet.employee_id);
                } else {
                    // check valid check in time
                    const start_time = time.timeStampToHours(worksheet.start_time);
                    const check_in_at = time.timeStampToHours(worksheet.check_in_at);
                    if (time.validCheckIn(start_time, check_in_at) === false) {
                        // get employee detail
                        const employee_detail = await pool
                            .getData(
                                queries.Employee.getEmployeeDetails,
                                [worksheet.employee_id]
                            );
                        // handle delete leave day of employee
                        await pool
                            .setData(
                                queries.Employee.updateEmployeeDetail,
                                [
                                    { leave_day_of_year: employee_detail[0].leave_day_of_year - 8 },
                                    worksheet.employee_id
                                ]
                            );
                        // send notification to employee
                        const noti = {
                            title: 'Absent',
                            content: `You are absent on ${time.getNowDate()}`
                        }
                        await notification.addNotification(noti, worksheet.employee_id);
                    }
                }
            }
        }
        global.logger.info(`Scan ${sheet} of ${role} is running success at ${time.getNow()}`);
    } catch (error) {
        global.logger.error(error);
        throw error;
    }
}

module.exports = {
    scanWorksheet
}