const time = require('../utilities/timeHelper')
const pool = require('../services/query.Service');
const queries = require('../queries/queryModal');

const getDayCalendar = async (start_day, end_day) => {
    try {
        const data = []
        const result = await pool
            .getData(
                queries.Calendar.getDayCalendar(start_day, end_day),
                []
            );
        result.map((item) => {
            data.push({
                date: time.timeStampToDate(item.date),
                day_of_week: time.getDayOfWeek(item.date),
                isSpecialDay: item.isSpecialDay
            })
        })
        global.logger.info(`Model - Get day calendar successfully: ${JSON.stringify(data)}`)
        return data;
    } catch (err) {
        global.logger.error(`Model - Get day calendar failed: ${err}`)
        throw err;
    }
}

const updateCalendar = async (date, calendarUpdate) => {
    try {
        const result = await pool
            .setData(
                queries.Calendar.updateCalendar,
                [calendarUpdate, date]
            );
        global.logger.info(`Model - Update calendar successfully: ${JSON.stringify(result)}`)
        return result;
    } catch (error) {
        global.logger.error(`Model - Update calendar failed: ${error}`)
        throw error;
    }
}

const getListDayOfWeek = async () => {
    try {
        const result = await pool
            .getData(
                queries.Calendar.getCalendar,
                []
            );

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
                    data.current_week = current_week;
                }
            }
            // get info of current day
        }
        return data;
    } catch (error) {
        global.logger.error(`Model - Get list day of week failed: ${error}`)
        throw error({ message: error.message })
    }
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