const worksheetModel = require('../models/worksheetsModel');

const createWorksheet = (req, res) => {
    worksheetModel.createWorksheet(req.body)
        .then(results => {
            res.status(200).json({
                message: "Create worksheet successfully",
                data: results
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Error create worksheet",
                error: error.message
            })
        })
}

const getListWorksheet = (req, res) => {
    worksheetModel.getListWorksheet()
        .then(results => {
            res.status(200).json({
                message: "Get list worksheet successfully",
                data: results
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Error get list worksheet",
                error: error.message
            })
        })
}

const updateWorksheet = (req, res) => {
    worksheetModel.updateWorksheet(req.body, req.params.id)
        .then(results => {
            res.status(200).json({
                message: "Update worksheet successfully",
                data: results
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Error update worksheet",
                error: error.message
            })
        })
}

const deleteWorksheet = (req, res) => {
    worksheetModel.deleteWorksheet(req.params.id)
        .then(results => {
            res.status(200).json({
                message: "Delete worksheet successfully",
                data: results
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Error delete worksheet",
                error: error.message
            })
        })
}

const searchWorksheetBy = (req, res) => {
    worksheetModel.searchWorksheetBy(req.query.searchBy, req.query.keywords)
        .then(results => {
            res.status(200).json({
                message: "Search worksheet successfully",
                data: results
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Error search worksheet",
                error: error.message
            })
        })
}

const getWorksheetDetail = (req, res) => {
    worksheetModel.getWorksheetDetail(req.params.id)
        .then(results => {
            res.status(200).json({
                message: "Get worksheet detail successfully",
                data: results
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Error get worksheet detail",
                error: error.message
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