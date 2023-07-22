const schedule = require('node-schedule');
const checkInOutService = require('../services/checkInOut.Service');
const productServices = require('../services/product.Service.js');
// cashier schedule
// sheet 1 06:10 -- 12:20
const checkin_sheet1_cashier = '10 6 * * *';
const checkout_sheet1_cashier = '20 12 * * *';
// sheet 2 12:10 -- 18:20
const checkin_sheet2_cashier = '10 12 * * *';
const checkout_sheet2_cashier = '20 18 * * *';
// sheet 3 18:10 -- 6:20
const checkin_sheet3_cashier = '10 18 * * *';
const checkout_sheet3_cashier = '20 6 * * *';
// guard schedule
// sheet 1 06:10 -- 18:20
const checkin_sheet1_guard = '10 6 * * *';
const checkout_sheet1_guard = '20 18 * * *';
// sheet 2 18:10 -- 6:20
const checkin_sheet2_guard = '10 18 * * *';
const checkout_sheet2_guard = '20 6 * * *';
// Cronjob auto update status product unavailable
const updateStatusProductUnavailable = '51 15 * * *';
// schedule job
// cashier
const runSchedule = () => {
    // cashier
    // sheet 1
    schedule.scheduleJob(checkin_sheet1_cashier, () => checkInOutService.scanCheckIn('cashier', 1));
    schedule.scheduleJob(checkout_sheet1_cashier, () => checkInOutService.scanCheckOut('cashier', 1));
    // sheet 2
    schedule.scheduleJob(checkin_sheet2_cashier, () => checkInOutService.scanCheckIn('cashier', 2));
    schedule.scheduleJob(checkout_sheet2_cashier, () => checkInOutService.scanCheckOut('cashier', 2));
    // sheet 3
    schedule.scheduleJob(checkin_sheet3_cashier, () => checkInOutService.scanCheckIn('cashier', 3));
    schedule.scheduleJob(checkout_sheet3_cashier, () => checkInOutService.scanCheckOut('cashier', 3));
    // guard
    // sheet 1
    schedule.scheduleJob(checkin_sheet1_guard, () => checkInOutService.scanCheckIn('guard', 1));
    schedule.scheduleJob(checkout_sheet1_guard, () => checkInOutService.scanCheckOut('guard', 1));
    // sheet 2
    schedule.scheduleJob(checkin_sheet2_guard, () => checkInOutService.scanCheckIn('guard', 2));
    schedule.scheduleJob(checkout_sheet2_guard, () => checkInOutService.scanCheckOut('guard', 2));
    // update status product unavailable
    schedule.scheduleJob(updateStatusProductUnavailable, productServices.updateStatusProductUnavailable);

    global.logger.info('Schedule job is running');
}

runSchedule();

