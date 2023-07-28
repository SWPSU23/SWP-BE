const schedule = require('node-schedule');
const checkInOutService = require('../services/checkInOut.Service');
const productServices = require('../services/product.Service.js');
const salaryServices = require('../services/salaryCalculator.Service');
// schedule job
const runSchedule = () => {
    // check out time sheet 1 of cashier
    schedule.scheduleJob('30 12 * * *', () => checkInOutService.scanWorksheet('cashier', 1));
    // check out time sheet 2 of cashier
    schedule.scheduleJob('20 18 * * *', () => checkInOutService.scanWorksheet('cashier', 2));
    // check out time sheet 3 of cashier
    schedule.scheduleJob('30 6 * * *', () => checkInOutService.scanWorksheet('cashier', 3));
    // check out time sheet 1 of guard
    schedule.scheduleJob('30 18 * * *', () => checkInOutService.scanWorksheet('guard', 1));
    // check out time sheet 2 of guard
    schedule.scheduleJob("30 6 * * *", () => checkInOutService.scanWorksheet('guard', 2));
    // scan product expired
    schedule.scheduleJob("0 0 * * *", productServices.updateStatusProductUnavailable);
    // caculate salary every 5th of month
    schedule.scheduleJob("0 0 5 * *", () => salaryServices.calculateSalaryByWorksheet());
    // checkInOutService.scanWorksheet('cashier', 2);
    global.logger.info('Schedule job is running');
}
// config schedule lock when another instance is running
runSchedule();

