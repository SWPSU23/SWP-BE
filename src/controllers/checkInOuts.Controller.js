const checkInOutModel = require('../models/checkInOuts.Model');
const checkInOutValidator = require('../validators/checkInOuts.Validator');

const updateCheckIn = async (req, res) => {
    try {
        const results = await checkInOutModel
            .updateCheckIn(
                await checkInOutValidator.validateUpdateCheckIn(req.body.employee_id),
                req.body.employee_id
            );
        res
            .status(200)
            .json({
                success: true,
                data: results
            })
    } catch (error) {
        if (error.message.includes("ValidationError")) {
            res
                .status(400)
                .json({
                    success: false,
                    message: error.message
                })
        } else {
            res
                .status(500)
                .json({
                    success: false,
                    message: error.message
                })
        }

    }
}

const updateCheckOut = async (req, res) => {
    try {
        const results = await checkInOutModel
            .updateCheckOut(
                await checkInOutValidator.validateUpdateCheckOut(req.body.employee_id),
                req.body.employee_id
            );
        res
            .status(200)
            .json({
                success: true,
                data: results
            })
    } catch (error) {
        if (error.message.includes("ValidationError")) {
            res
                .status(400)
                .json({
                    success: false,
                    message: error.message
                })
        } else {
            res
                .status(500)
                .json({
                    success: false,
                    message: error.message
                })
        }
    }
}


module.exports = {
    updateCheckIn,
    updateCheckOut
}