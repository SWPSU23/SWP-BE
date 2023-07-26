const schedule = require('node-schedule');
const checkInOutService = require('../services/checkInOut.Service');
const productServices = require('../services/product.Service.js');
// cashier schedule
// sheet 1 12:30
const scanSheet1Cashier = '30 12 * * *';
// sheet 2  18:30
const scanSheet2Cashier = '20 18 * * *';
// sheet 3  6:30
const scanSheet3Cashier = '30 6 * * *';
// guard schedule
// sheet 1  18:30
const scanSheet1Guard = '30 18 * * *';
// sheet 2  6:30
const sacnSheet2Guard = '30 6 * * *';
// Cronjob auto update status product unavailable
const updateStatusProductUnavailable = '0 0 * * *';
// cronjob auto restart employee leave day
// const restartLeaveDay = '0 0 0 0 *';
// schedule job
// cashier
const runSchedule = () => {
    // cashier
    // sheet 1
    schedule.scheduleJob(scanSheet1Cashier, () => checkInOutService.scanWorksheet('cashier', 1));
    // sheet 2
    schedule.scheduleJob(scanSheet2Cashier, () => checkInOutService.scanWorksheet('cashier', 2));
    // sheet 3
    schedule.scheduleJob(scanSheet3Cashier, () => checkInOutService.scanWorksheet('cashier', 3));
    // guard
    // sheet 1
    schedule.scheduleJob(scanSheet1Guard, () => checkInOutService.scanWorksheet('guard', 1));
    // sheet 2
    schedule.scheduleJob(sacnSheet2Guard, () => checkInOutService.scanWorksheet('guard', 2));
    // update status product unavailable
    schedule.scheduleJob(updateStatusProductUnavailable, productServices.updateStatusProductUnavailable);

    global.logger.info('Schedule job is running');
}

runSchedule();

