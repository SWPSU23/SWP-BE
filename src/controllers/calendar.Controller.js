const calendarModel = require('../models/calendar.Model')

const createCalendar = (req, res) => {
    calendarModel.createCalendar()
        .then((result) => {
            res.status(200).send({
                success: true,
                message: 'Calendar created successfully',
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

const getDayCalendar = (req, res) => {
    const start_day = req.query.start_day;
    const end_day = req.query.end_day;
    calendarModel.getDayCalendar(start_day, end_day)
        .then((result) => {
            res.status(200).send({
                success: true,
                message: 'Get day calendar successfully',
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
                message: 'Update calendar successfully',
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
    createCalendar,
    getDayCalendar,
    updateCalendar
}