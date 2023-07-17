const worksheetModel = require('../models/worksheets.Model');
const worksheetValidator = require('../validators/worksheets.Validator');

const createWorksheet = async (req, res) => {
    try {
        const data = await worksheetModel
            .createWorksheet(
                await worksheetValidator
                    .validateCreateWorksheet(req.body)
            );
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

const getWorkSheetOfWeek = (req, res) => {
    worksheetModel
        .getWorkSheetOfWeek(req.query.start_date, req.query.end_date, req.query.role)
        .then(results => {
            res
                .status(200)
                .json({
                    success: true,
                    data: results
                })
        })
        .catch(error => {
            res
                .status(500)
                .json({
                    success: false,
                    message: error.message
                })
        })
}

const updateWorksheet = (req, res) => {
    worksheetModel
        .updateWorksheet(req.body, req.params.id)
        .then(results => {
            res
                .status(200)
                .json({
                    success: true,
                    data: results
                })
        })
        .catch(error => {
            res
                .status(500)
                .json({
                    success: false,
                    message: error.message
                })
        })
}

const deleteWorksheet = async (req, res) => {
    try {
        const data = await worksheetModel(
            await worksheetValidator
                .validateDeleteWorksheet(
                    req.params.id
                )
        );

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

const getWorksheetDetail = async (req, res) => {
    try {
        const data = await worksheetModel.getWorksheetDetail(req.params.id);

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
    createWorksheet,
    getWorkSheetOfWeek,
    updateWorksheet,
    deleteWorksheet,
    getWorksheetDetail
}