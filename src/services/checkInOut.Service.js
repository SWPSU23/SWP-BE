const time = require('../utilities/timeHelper');
const pool = require('./query.Service');
const queries = require('../queries/queryModal');
// cashier don't check in sheet 1
const scanCheckIn = async (role, sheet) => {
    try {
        pool.getPool();
        const currentDay = time.getNowDate();
        // get list work sheet of day by role
        const results = await pool
            .getData(
                queries.Schedule.getWorkSheetOfDayByRole(role, currentDay, sheet),
                []
            );
        // loop list work sheet for check in
        results.map(async (item) => {
            if (item.check_in_at === null) {
                // update status work sheet
                await pool
                    .setData(
                        queries.Worksheet.updateWorksheet,
                        [
                            { status: 'absent' },
                            item.id
                        ]
                    );
            }
        });
        global.logger.info(`Service - Scan check in sheet_${sheet} ${role} success`);
        return results;
    } catch (error) {
        global.logger.error(`Service - Error scan ${sheet} ${role}: ${error}`);
        throw error;
    }
}
// cashier don't check out sheet 1
const scanCheckOut = async (role, sheet) => {
    try {
        pool.getPool();
        const currentDay = time.getNowDate();
        // get list work sheet of day by role
        const results = await pool
            .getData(
                queries.Schedule.getWorkSheetOfDayByRole(role, currentDay, sheet),
                []
            );
        // loop list work sheet for check out
        results.map(async (item) => {
            if (item.check_out_at === null) {
                // update status work sheet
                await pool
                    .setData(
                        queries.Worksheet.updateWorksheet,
                        [
                            { status: 'absent' },
                            item.id
                        ]
                    );
            }
        });
        global.logger.info(`Service - Scan check out sheet_${sheet} ${role} success`);
        return results;
    } catch (error) {
        global.logger.error(`Service - Error scan ${sheet} ${role}: ${error}`);
        throw error;
    }
}

module.exports = {
    scanCheckIn,
    scanCheckOut
}