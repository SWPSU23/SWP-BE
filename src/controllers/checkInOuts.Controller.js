const checkInOutModel = require('../models/checkInOuts.Model');
const checkInOutValidation = require('../validations/checkInOuts.Validation');

const updateCheckIn = (req, res) => {
    global.logger.info("Update check in", req.params.worksheet_id);
    checkInOutValidation
        .updateCheckIn(req.params.worksheet_id)
        .then((check_in_at) => {
            checkInOutModel.updateCheckIn(req.params.worksheet_id, check_in_at)
                .then(results => {
                    res.status(200).json({
                        sucess: true,
                        data: results
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        sucess: false,
                        message: error.message
                    })
                })
        })
        .catch(error => {
            res.status(500).json({
                sucess: false,
                message: error.message
            })
        })
}

const updateCheckOut = (req, res) => {
    checkInOutValidation
        .updateCheckOut(req.params.worksheet_id)
        .then((check_out_at) => {
            checkInOutModel.updateCheckOut(req.params.worksheet_id, check_out_at)
                .then(results => {
                    res.status(200).json({
                        sucess: true,
                        data: results
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        sucess: false,
                        message: error.message
                    })
                })
        })
        .catch(error => {
            res.status(500).json({
                sucess: false,
                message: error.message
            })
        })
}

const deleteCheckInOut = (res, req) => {
    checkInOutModel.deleteCheckInOut(req.body.worksheet_id)
        .then(results => {
            res.status(200).json({
                sucess: true,
                data: results
            })
        })
        .catch(error => {
            res.status(500).json({
                sucess: false,
                message: "Error delete check in out: " + error
            })
        })
}



module.exports = {
    updateCheckIn,
    updateCheckOut,
    deleteCheckInOut
}