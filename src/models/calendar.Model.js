const time = require('../utilities/timeHelper')
const moment = require('moment')
const apiHoliday = require('../utilities/holidays')
const pool = require('../services/queryHelper').getPool();
const queries = require('../queries/queryModal');

const checkHoliday = (date) => {
    const holiday = apiHoliday.find((item) => item.date === date);
    return {
        date: date,
        isSpecialDay: holiday ? 'yes' : 'no'
    };
}

const createCalendar = () => {
    // Set the starting date
    const startDate = time.getNowDate();
    // Set the ending date
    const endDate = time.timeStampToDate('2023-12-31');
    // query to insert all holidays
    const query = queries.Calendar.createCalendar;
    // Iterate over the days
    return new Promise((resolve, reject) => {

        for (let m = moment(startDate); m.diff(endDate, 'days') <= 0; m.add(1, 'days')) {
            const data = checkHoliday(m.format('YYYY-MM-DD'));
            pool.query(query, [data.date, data.isSpecialDay], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    global.logger.info('Calendar created successfully', result);
                }
            })
        }
        console.log('Calendar created successfully', 1)

        resolve('Calendar created successfully')

    })
}

const getDayCalendar = (start_day, end_day) => {
    const query = queries.Calendar.getDayCalendar(start_day, end_day);
    global.logger.info(query);
    return new Promise((resolve, reject) => {
        pool.query(query, [start_day, end_day], (err, result) => {
            if (err) {
                global.logger.error('Get day calendar failed', err.message)
                reject(err);
            } else {
                // convert date timestamp to YYYY-MM-DD
                const data = result.map((item) => {
                    return {
                        date: time.timeStampToDate(item.date),
                        day_of_week: time.getDayOfWeek(item.date),
                        isSpecialDay: item.isSpecialDay
                    }
                })
                resolve(data);
            }
        })
    })
}

const updateCalendar = (date, isSpecialDay) => {
    const query = queries.Calendar.updateCalendar;
    return new Promise((resolve, reject) => {
        pool.query(query, [isSpecialDay, date], (err, result) => {
            if (err) {
                global.logger.error('Update calendar failed', err.message)
                reject(err);
            } else {
                global.logger.info('Update calendar successfully', result)
                resolve('Update calendar successfully');
            }
        })
    })
}

module.exports = {
    createCalendar,
    getDayCalendar,
    updateCalendar
}