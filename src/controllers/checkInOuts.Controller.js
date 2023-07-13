const checkInOutModel = require('../models/checkInOuts.Model');

const updateCheckIn = (req, res) => {
    global.logger.info("Update check in", req.params.worksheet_id);
    checkInOutModel.updateCheckIn(req.params.worksheet_id)
        .then(results => {
            res.status(200).json({
                sucess: true,
                data: results
            })
        })
        .catch(error => {
            res.status(500).json({
                sucess: false,
                message: "Error update check in: " + error
            })
        })
}

const updateCheckOut = (req, res) => {
    checkInOutModel.updateCheckOut(req.params.worksheet_id)
        .then(results => {
            res.status(200).json({
                sucess: true,
                data: results
            })
        })
        .catch(error => {
            res.status(500).json({
                sucess: false,
                message: "Error update check out: " + error
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