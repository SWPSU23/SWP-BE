const schedule = require('node-schedule');
const checkInOutService = require('../services/checkInOut.Service');
// cashier schedule
// sheet 1 06:10 -- 12:20
const checkin_sheet1_cashier = '10 6 * * *';
const checkout_sheet1_cashier = '20 12 * * *';
// sheet 2 10:10 -- 18:20
const checkin_sheet2_cashier = '10 10 * * *';
const checkout_sheet2_cashier = '20 18 * * *';
// sheet 3 18:10 -- 23:20
const checkin_sheet3_cashier = '10 18 * * *';
const checkout_sheet3_cashier = '20 23 * * *';
// guard schedule
// sheet 1 06:10 -- 18:20
const checkin_sheet1_guard = '10 6 * * *';
const checkout_sheet1_guard = '20 18 * * *';
// sheet 2 18:10 -- 23:20
const checkin_sheet2_guard = '10 18 * * *';
const checkout_sheet2_guard = '20 23 * * *';

// schedule job
// cashier
const runSchedule = () => {
    // cashier
    // sheet 1
    schedule.scheduleJob(checkin_sheet1_cashier, checkInOutService.checkInSheet1Cashier);
    schedule.scheduleJob(checkout_sheet1_cashier, checkInOutService.checkOutSheet1Cashier);
    // sheet 2
    schedule.scheduleJob(checkin_sheet2_cashier, checkInOutService.checkInSheet2Cashier);
    schedule.scheduleJob(checkout_sheet2_cashier, checkInOutService.checkOutSheet2Cashier);
    // sheet 3
    schedule.scheduleJob(checkin_sheet3_cashier, checkInOutService.checkInSheet3Cashier);
    schedule.scheduleJob(checkout_sheet3_cashier, checkInOutService.checkOutSheet3Cashier);
    // guard
    // sheet 1
    schedule.scheduleJob(checkin_sheet1_guard, checkInOutService.checkInSheet1Guard);
    schedule.scheduleJob(checkout_sheet1_guard, checkInOutService.checkOutSheet1Guard);
    // sheet 2
    schedule.scheduleJob(checkin_sheet2_guard, checkInOutService.checkInSheet2Guard);
    schedule.scheduleJob(checkout_sheet2_guard, checkInOutService.checkOutSheet2Guard);

    global.logger.info(`Schedule job is running`);
}

runSchedule();

