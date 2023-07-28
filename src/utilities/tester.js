const salaryCalculator = require('../services/salaryCalculator.Service')
const time = require('./timeHelper')

const testSalaryCalculator = async () => {
    await salaryCalculator.calculateSalaryByWorksheet(time.getNowMonth())
}

// testSalaryCalculator();

// test add notification
const notification = require('../services/notification.Service')
const testAddNotification = async () => {
    const notificationData = {
        title: 'Test notification',
        content: 'Test notification content',
        is_read: false,
    }
    await notification.addNotification('1', notificationData)
}
// testAddNotification()

// test dashboard
const dashboard = require('../services/dashboard.Service')
const testDashboard = async () => {
    const data = await dashboard.readDashboard()
    console.log(data)
}
testDashboard()
