const time = require('../utilities/timeHelper')
const pool = require('../services/queryHelper').getPool();
const queries = require('../queries/queryModal');

const getDayCalendar = (start_day, end_day) => {
    const query = queries.Calendar.getDayCalendar(start_day, end_day);
    global.logger.info(`Model - Get day calendar query: ${query}`);
    return new Promise((resolve, reject) => {
        pool.query(query, [start_day, end_day], (err, result) => {
            if (err) {
                global.logger.error(`Model - Get day calendar failed: ${err}`)
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
                global.logger.info(`Model - Get day calendar successfully: ${data}`)
                resolve(data);
            }
        })
    })
}

const updateCalendar = (date, isSpecialDay) => {
    const query = queries.Calendar.updateCalendar;
    return new Promise((resolve, reject) => {
        pool.query(query,
            [isSpecialDay, date],
            (err, result) => {
                if (err) {
                    global.logger.error(`Model - Update calendar failed: ${err}`)
                    reject(err);
                } else {
                    global.logger.info(`Model - Update calendar successfully: ${result}`)
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
                global.logger.error(`Model - Get list day of week failed: ${err}`)
                reject(err);
            } else {
                const data = {
                    current_week: -1,
                    list_week: []
                };
                let current_week = -1;
                for (let i = 0; i < result.length; i++) {
                    if (i + 6 >= result.length) break;
                    // day of list 
                    const day = time.getDayOfWeek(result[i].date);
                    // check if day is Monday
                    if (day === "Monday") {
                        // get list day of week from Monday to Sunday
                        data.list_week.push({
                            from_date: time.timeStampToDate(result[i].date),
                            to_date: time.timeStampToDate(result[i + 6].date),
                        })

                        current_week++;
                        // get info of current day
                        if (getPossitionCurrentDay(result[i].date, result[i + 6].date)) {
                            global.logger.info(`current_week: ${current_week}`)
                            data.current_week = `list_week[${current_week}]`;
                        }
                    }
                    // get info of current day
                }
                global.logger.info(`Model - Get list day of week successfully: ${data}`)
                resolve(data);
            }
        })
    })
}

const getPossitionCurrentDay = (start_date, end_date) => {
    const current_date = time.getNowDate();
    start_date = time.timeStampToDate(start_date);
    end_date = time.timeStampToDate(end_date);
    if (current_date >= start_date && current_date <= end_date) {
        return true;
    }
    return false;
}


module.exports = {
    getDayCalendar,
    updateCalendar,
    getListDayOfWeek
}