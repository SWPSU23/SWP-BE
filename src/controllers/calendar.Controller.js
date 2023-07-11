const calendarModel = require('../models/calendar.Model')

const getDayCalendar = (req, res) => {
    const start_day = req.query.start_day;
    const end_day = req.query.end_day;
    calendarModel.getDayCalendar(start_day, end_day)
        .then((result) => {
            res.status(200).send({
                success: true,
                data: result
            })
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: err.message
            })
        })
}

const updateCalendar = (req, res) => {
    const date = req.params.date;
    const isSpecialDay = req.body.isSpecialDay;
    calendarModel.updateCalendar(date, isSpecialDay)
        .then((result) => {
            res.status(200).send({
                success: true,
                data: result
            })
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: err.message
            })
        })
}

const getListDayOfWeek = (req, res) => {
    calendarModel.getListDayOfWeek()
        .then((result) => {
            res.status(200).send({
                success: true,
                data: result
            })
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: err.message
            })
        })
}

module.exports = {
    getDayCalendar,
    updateCalendar,
    getListDayOfWeek
}