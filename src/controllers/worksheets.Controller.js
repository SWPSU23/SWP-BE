const worksheetModel = require('../models/worksheets.Model');
const worksheetValidation = require('../validations/worksheets.Validation');

const createWorksheet = (req, res) => {
    worksheetValidation
        .createWorksheet(req.body)
        .then(() => {
            worksheetModel.createWorksheet(req.body)
                .then(results => {
                    res.status(200).json({
                        success: true,
                        data: results
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        success: false,
                        message: error.message
                    })
                })
        })
        .catch(error => {
            res.status(400).json({
                success: false,
                message: error.message
            })
        })
}

const getWorkSheetOfWeek = (req, res) => {
    worksheetModel
        .getWorkSheetOfWeek(req.query.start_date, req.query.end_date, req.query.role)
        .then(results => {
            res.status(200).json({
                success: true,
                data: results
            })
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: error.message
            })
        })
}

const updateWorksheet = (req, res) => {
    worksheetModel
        .updateWorksheet(req.body, req.params.id)
        .then(results => {
            res.status(200).json({
                success: true,
                data: results
            })
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: error.message
            })
        })
}

const deleteWorksheet = (req, res) => {
    worksheetValidation
        .deleteWorksheet(req.params.id)
        .then(() => {
            worksheetModel.deleteWorksheet(req.params.id)
                .then(results => {
                    res.status(200).json({
                        success: true,
                        data: results
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        success: false,
                        message: error.message
                    })
                })
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: error.message
            })
        })
}

const getWorksheetDetail = (req, res) => {
    worksheetModel
        .getWorksheetDetail(req.params.id)
        .then(results => {
            res.status(200).json({
                success: true,
                data: results
            })
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: error.message
            })
        })
}



module.exports = {
    createWorksheet,
    getWorkSheetOfWeek,
    updateWorksheet,
    deleteWorksheet,
    getWorksheetDetail
}