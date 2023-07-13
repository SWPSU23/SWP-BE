const worksheetModel = require('../models/worksheets.Model');

const createWorksheet = (req, res) => {
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
}

const getListWorksheet = (req, res) => {
    worksheetModel.getWorkSheetOfWeek(req.query.start_date, req.query.end_date, req.query.role)
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
    worksheetModel.updateWorksheet(req.body, req.params.id)
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
}

const searchWorksheetBy = (req, res) => {
    worksheetModel.searchWorksheetBy(req.query.searchBy, req.query.keywords)
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

const getWorksheetDetail = (req, res) => {
    worksheetModel.getWorksheetDetail(req.params.id)
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
    getListWorksheet,
    updateWorksheet,
    deleteWorksheet,
    searchWorksheetBy,
    getWorksheetDetail
}