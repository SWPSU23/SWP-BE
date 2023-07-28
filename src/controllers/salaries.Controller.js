const salaryModel = require('../models/salaries.Model');

const getPayRoll = async (req, res) => {
    try {
        const data = await salaryModel.getPayRoll(req.query.month_year);
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

const getPaySlipDetails = async (req, res) => {
    try {
        const data = await salaryModel.getPaySlipDetails(req.params.employee_id, req.query.month_year);
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
                message: error
            })
    }
}

const getPaySlip = async (req, res) => {
    try {
        const data = await salaryModel.getPaySlip(req.params.employee_id, req.query.month_year);
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
    getPayRoll,
    getPaySlipDetails,
    getPaySlip
}
