const salaryCalculator = require('../services/salaryCalculator.Service');
const time = require('./timeHelper');

const testSalaryCalculator = async () => {
    await salaryCalculator.calculateSalaryByWorksheet(time.getNowMonth());
}

testSalaryCalculator();