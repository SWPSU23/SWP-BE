const checkInOutModel = require('../models/checkInOuts.Model');
const checkInOutValidator = require('../validators/checkInOuts.Validator');

const updateCheckIn = async (req, res) => {
    try {
        const results = await checkInOutModel.updateCheckIn(req.params.worksheet_id,
            await checkInOutValidator
                .validateUpdateCheckIn(
                    req.params.worksheet_id
                )
        );
        res
            .status(200)
            .json({
                success: true,
                data: results
            })
    } catch (error) {
        res
            .status(500)
            .json({
                success: false,
                message: error.message
            })
    }
}

const updateCheckOut = async (req, res) => {
    try {
        const results = await checkInOutModel
            .updateCheckOut(
                req.params.worksheet_id,
                await checkInOutValidator.validateUpdateCheckOut(
                    req.params.worksheet_id
                )
            );
        res
            .status(200)
            .json({
                success: true,
                data: results
            })
    } catch (error) {
        res
            .status(500)
            .json({
                success: false,
                message: error.message
            })
    }
}


module.exports = {
    updateCheckIn,
    updateCheckOut
}