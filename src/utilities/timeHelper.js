const moment = require('moment');

const getNow = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
};
const getNowDate = () => {
    return moment().format('YYYY-MM-DD');
};
const getNowTime = () => {
    return moment().format('HH:mm:ss');
}
const getNowTimeStamp = () => {
    return moment().unix();
}
const getNowTimeSql = () => {
    let now = new Date(getNowTimeStamp * 1000).toISOString().slice(0, 19).replace('T', ' ');
    return now;
}
const timeStampToDate = (timeStamp) => {
    return moment(timeStamp).format('YYYY-MM-DD');
}
const dateToTimeStamp = (date) => {
    return moment(date).unix();
}
module.exports = {
    getNow: getNow,
    getNowDate: getNowDate,
    getNowTime: getNowTime,
    getNowTimeStamp: getNowTimeStamp,
    getNowTimeSql: getNowTimeSql,
    timeStampToDate: timeStampToDate,
    dateToTimeStamp: dateToTimeStamp,
};