const sheetsModel = require('../models/sheets.Model');

const createSheet = (req, res) => {
    sheetsModel.createSheet(req.body)
        .then((results) => {
            res.status(200).json({
                message: 'Create sheet successfully',
                data: results
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Create sheet failed',
                error: error.message
            })
        })
}

const getListSheet = (req, res) => {
    sheetsModel.getListSheet()
        .then((results) => {
            res.status(200).json({
                message: 'Get list sheet successfully',
                data: results
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Get list sheet failed',
                error: error.message
            })
        })
}

const updateSheet = (req, res) => {
    sheetsModel.updateSheet(req.body, req.params.id)
        .then((results) => {
            res.status(200).json({
                message: 'Update sheet successfully',
                data: results
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Update sheet failed',
                error: error.message
            })
        })
}

const deleteSheet = (req, res) => {
    sheetsModel.deleteSheet(req.params.id)
        .then((results) => {
            res.status(200).json({
                message: 'Delete sheet successfully',
                data: results
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Delete sheet failed',
                error: error.message
            })
        })
}

module.exports = {
    createSheet,
    getListSheet,
    updateSheet,
    deleteSheet
}