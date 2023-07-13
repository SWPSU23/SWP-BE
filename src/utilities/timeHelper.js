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
    return moment(timeStamp).format('hh:mm:ss')
}

const timeStampToDay = (timeStamp) => {
    return moment(timeStamp).format('YYYY-MM-DD hh:mm:ss')
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

module.exports = {
    getNow: getNow,
    getNowDate: getNowDate,
    getNowTime: getNowTime,
    getNowTimeStamp: getNowTimeStamp,
    getNowTimeSql: getNowTimeSql,
    timeStampToDate: timeStampToDate,
    dateToTimeStamp: dateToTimeStamp,
    timeStampToHours: timeStampToHours,
    getDayOfWeek: getDayOfWeek,
    timeStampToDay: timeStampToDay
}
