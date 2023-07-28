const calendarModel = require('../models/calendar.Model')

const getDayCalendar = async (req, res) => {
    try {
        const data = await calendarModel.getDayCalendar(req.query.start_day, req.query.end_day);
        res
            .status(200)
            .send({
                success: true,
                data: data
            })
    } catch (error) {
        res
            .status(500)
            .send({
                success: false,
                message: error.message
            })
    }
}

const updateCalendar = async (req, res) => {
    try {
        const data = await calendarModel.updateCalendar(req.body.date, req.body);
        res
            .status(200)
            .send({
                success: true,
                data: data
            })
    } catch (error) {
        res
            .status(500)
            .send({
                success: false,
                message: error.message
            })
    }
}

const getListDayOfWeek = async (req, res) => {
    try {
        const data = await calendarModel.getListDayOfWeek();
        res
            .status(200)
            .send({
                success: true,
                data: data
            })
    } catch (error) {
        res
            .status(500)
            .send({
                success: false,
                message: error.message
            })
    }
}

const getListMonthOfYear = async (req, res) => {
    try {
        const data = await calendarModel.getListMonthOfYear();
        res
            .status(200)
            .send({
                success: true,
                data: data
            })
    } catch (error) {
        res
            .status(500)
            .send({
                success: false,
                message: error.message
            })
    }
}

module.exports = {
    getDayCalendar,
    updateCalendar,
    getListDayOfWeek,
    getListMonthOfYear
}