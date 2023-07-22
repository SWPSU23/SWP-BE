const time = require('../utilities/timeHelper');
const pool = require('./query.Service');
const queries = require('../queries/queryModal');
// cashier don't check in sheet 1
const checkInSheet1Cashier = async () => {
    try {
        const currentDay = time.getNowDate();
        const sheet = 1;
        const role = 'cashier';
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
        global.logger.info(`Service - Scan check in sheet 1 cashier success`);
        return results;
    } catch (error) {
        global.logger.error(`Service - Error checkInSheet1Cashier: ${error}`);
        throw error;
    }
}
// cashier don't check out sheet 1
const checkOutSheet1Cashier = async () => {
    try {
        const currentDay = time.getNowDate();
        const sheet = 1
        const role = 'cashier'
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
        global.logger.info(`Service - Scan check out sheet 1 cashier success`);
        return results;
    } catch (error) {
        global.logger.error(`Service - Error checkOutSheet1Cashier: ${error}`);
        throw error;
    }
}
// cashier don't check in sheet 2
const checkInSheet2Cashier = async () => {
    try {
        const currentDay = time.getNowDate();
        const sheet = 2;
        const role = 'cashier';
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
        global.logger.info(`Service - Scan check in sheet 2 cashier success`);
        return results;
    } catch (error) {
        global.logger.error(`Service - Error checkInSheet2Cashier: ${error}`);
        throw error;
    }
}
// cashier don't check out sheet 2
const checkOutSheet2Cashier = async () => {
    try {
        const currentDay = time.getNowDate();
        const sheet = 2;
        const role = 'cashier';
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
        global.logger.info(`Service - Scan check out sheet 2 cashier success`);
        return results;
    } catch (error) {
        global.logger.error(`Service - Error checkOutSheet2Cashier: ${error}`);
        throw error;
    }
}
// cashier don't check in sheet 3
const checkInSheet3Cashier = async () => {
    try {
        const currentDay = time.getNowDate();
        const sheet = 3;
        const role = 'cashier';
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
        })
        global.logger.info(`Service - Scan check in sheet 3 cashier success`);
        return results;
    } catch (error) {
        global.logger.error(`Service - Error checkInSheet3Cashier: ${error}`);
        throw error;
    }
}
// cashier don't check out sheet 3
const checkOutSheet3Cashier = async () => {
    try {
        const currentDay = time.getNowDate();
        const sheet = 3;
        const role = 'cashier';
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
        })
        global.logger.info(`Service - Scan check out sheet 3 cashier success`);
        return results;
    } catch (error) {
        global.logger.error(`Service - Error checkOutSheet3Cashier: ${error}`);
        throw error;
    }
}
// guard don't check in sheet 1
const checkInSheet1Guard = async () => {
    try {
        const currentDay = time.getNowDate();
        const sheet = 1;
        const role = 'guard';
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
        global.logger.info(`Service - Scan check in sheet 1 guard success`);
        return results;
    } catch (error) {
        global.logger.error(`Service - Error checkInSheet1Guard: ${error}`);
        throw error;
    }
}

// guard don't check out sheet 1
const checkOutSheet1Guard = async () => {
    try {
        const currentDay = time.getNowDate();
        const sheet = 1;
        const role = 'guard';
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
        global.logger.info(`Service - Scan check out sheet 1 guard success`);
        return results;
    } catch (error) {
        global.logger.error(`Service - Error checkOutSheet1Guard: ${error}`);
        throw error;
    }
}
// guard don't check in sheet 2
const checkInSheet2Guard = async () => {
    try {
        const currentDay = time.getNowDate();
        const sheet = 2;
        const role = 'guard';
        // get list work sheet of day by role
        const results = await pool
            .getData(
                queries.Schedule.getWorkSheetOfDayByRole(role, currentDay, sheet),
                []
            );
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
        global.logger.info(`Service - Scan check in sheet 2 guard success`)
        return results;
    } catch (error) {
        global.logger.error(`Service - Error checkInSheet2Guard: ${error}`);
        throw error;
    }
}
// guard don't check out sheet 2
const checkOutSheet2Guard = async () => {
    try {
        const currentDay = time.getNowDate();
        const sheet = 2;
        const role = 'guard';
        const results = await pool
            .getData(
                queries.Schedule.getWorkSheetOfDayByRole(role, currentDay, sheet),
                []
            );
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
        global.logger.info(`Service - Scan check out sheet 2 guard success`)
        return results;
    } catch (error) {
        global.logger.error(`Service - Error checkOutSheet2Guard: ${error}`);
        throw error;
    }
}

module.exports = {
    checkInSheet1Cashier,
    checkOutSheet1Cashier,
    checkInSheet2Cashier,
    checkOutSheet2Cashier,
    checkInSheet3Cashier,
    checkOutSheet3Cashier,
    checkInSheet1Guard,
    checkOutSheet1Guard,
    checkInSheet2Guard,
    checkOutSheet2Guard
}