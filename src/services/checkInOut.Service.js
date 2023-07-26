const time = require('../utilities/timeHelper');
const pool = require('./query.Service');
const queries = require('../queries/queryModal');
// cashier don't check in sheet 1
const scanWorksheet = async (role, sheet) => {
    try {
        const list_worksheet_by_date = await pool
            .getData(
                queries.Schedule.getWorkSheetOfDayByRole(role, time.getNowDate(), sheet),
                []
            );
        if (list_worksheet_by_date.length === 0) {
            global.logger.info('ValidationError: No workshet to day');
        } else {
            list_worksheet_by_date.map(async (worksheet) => {
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
                    }
                }
            })
        }
    } catch (error) {
        global.logger.error(error);
        throw error;
    }
}

module.exports = {
    scanWorksheet
}