const time = require('../utilities/timeHelper')
const pool = require('../services/queryHelper').getPool();
const queries = require('../queries/queryModal');

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

const getListDayOfWeek = () => {
    const query = queries.Calendar.getCalendar;
    return new Promise((resolve, reject) => {
        pool.query(query, (err, result) => {
            if (err) {
                global.logger.error('Get list day of week failed', err.message)
                reject(err);
            } else {
                const data = [];
                for (let i = 0; i < result.length; i++) {
                    if (i + 6 >= result.length) break;
                    const dayOfWeek = time.getDayOfWeek(result[i].date);
                    if (dayOfWeek === "Monday") {
                        data.push({
                            from_date: time.timeStampToDate(result[i].date),
                            to_date: time.timeStampToDate(result[i + 6].date),
                        })
                    }
                }
                resolve(data);
            }
        })
    })
}

module.exports = {
    getDayCalendar,
    updateCalendar,
    getListDayOfWeek
}