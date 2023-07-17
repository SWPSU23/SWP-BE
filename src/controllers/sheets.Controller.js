const sheetsModel = require('../models/sheets.Model');

const createSheet = async (req, res) => {
    try {
        const data = await sheetsModel.createSheet(req.body);

        res
            .status(201) // 201 meaning resource created successfully
            .json({
                success: true,
                sheet_id: data.insertId
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

const getListSheet = async (req, res) => {
    try {
        const data = await sheetsModel.getListSheet();
        res
            .status(200)
            .json({
                success: true,
                data: data
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

const updateSheet = async (req, res) => {
    try {
        const data = await sheetsModel.updateSheet(req.params.id, req.body);
        res
            .status(200)
            .json({
                success: true,
                data: data
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

const deleteSheet = (req, res) => {
    try {
        const data = sheetsModel.deleteSheet(req.params.id);
        res
            .status(200)
            .json({
                success: true,
                data: data
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
    createSheet,
    getListSheet,
    updateSheet,
    deleteSheet
}