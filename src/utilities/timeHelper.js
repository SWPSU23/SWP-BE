const moment = require('moment')

const getNow = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss')
}
const getNowDate = () => {
    return moment().format('YYYY-MM-DD')
}
const getNowTime = () => {
    return moment().format('HH:mm:ss')
}
const getNowTimeStamp = () => {
    return moment().unix()
}
const getNowTimeSql = () => {
    let now = new Date(getNowTimeStamp * 1000)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    return now
}
const timeStampToDate = (timeStamp) => {
    return moment(timeStamp).format('YYYY-MM-DD')
}

const timeStampToHours = (timeStamp) => {
    return moment(timeStamp).format('HH:mm:ss')
}

const timeStampToDay = (timeStamp) => {
    return moment(timeStamp).format('YYYY-MM-DD HH:mm:ss')
}

const dateToTimeStamp = (date) => {
    return moment(date).unix()
}

const getDayOfWeek = (date) => {
    const dayOfWeek = moment(date).isoWeekday();
    if (dayOfWeek === 1) {
        return 'Monday'
    } else if (dayOfWeek === 2) {
        return 'Tuesday'
    } else if (dayOfWeek === 3) {
        return 'Wednesday'
    } else if (dayOfWeek === 4) {
        return 'Thursday'
    } else if (dayOfWeek === 5) {
        return 'Friday'
    } else if (dayOfWeek === 6) {
        return 'Saturday'
    } else {
        return 'Sunday'
    }
}

const validCheckOut = (end_time, hours) => {
    const earliest_time_to_check_out = moment(end_time, 'HH:mm:ss');
    const latest_time_to_check_out = moment(end_time, 'HH:mm:ss').add(30, 'minutes');
    hours = moment(hours, 'HH:mm:ss');
    if (hours > earliest_time_to_check_out && hours < latest_time_to_check_out) {
        return true;
    }
    return false;
}

const validInRangeHours = (start_time, end_time, hours) => {

    start_time = moment(start_time, 'HH:mm:ss').subtract(20, 'minutes');
    end_time = moment(end_time, 'HH:mm:ss').add(30, 'minutes');
    hours = moment(hours, 'HH:mm:ss');
    if (start_time > end_time) {
        end_time = moment(end_time, 'HH:mm:ss').add(1, 'days');
    }
    if (hours > start_time && hours < end_time) {
        return true;
    }
    return false;
}

const validCheckIn = (start_time, hours) => {
    const earliest_time_to_check_in = moment(start_time, 'HH:mm:ss').subtract(20, 'minutes');
    const latest_time_to_check_in = moment(start_time, 'HH:mm:ss').add(10, 'minutes');
    hours = moment(hours, 'HH:mm:ss');
    if (hours > earliest_time_to_check_in && hours < latest_time_to_check_in) {
        return true;
    }
    return false;
}


module.exports = {
    getNow,
    getNowDate,
    getNowTime,
    getNowTimeStamp,
    getNowTimeSql,
    timeStampToDate,
    timeStampToHours,
    timeStampToDay,
    dateToTimeStamp,
    getDayOfWeek,
    validCheckOut,
    validInRangeHours,
    validCheckIn
}
