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

const getWorkSheetOfWeek = async (req, res) => {
    try {
        const results = await worksheetModel
            .getWorkSheetOfWeek(
                req.query.start_date,
                req.query.end_date,
                req.query.role
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

const updateWorksheet = async (req, res) => {
    try {
        const result = await worksheetModel
            .updateWorksheet(
                req.body,
                await worksheetValidator.validateUpdateWorksheet(req.params.id, req.body.employee_id)
            );
        res
            .status(200)
            .json({
                success: true,
                data: result
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

const deleteWorksheet = async (req, res) => {
    try {
        const data = await worksheetModel
            .deleteWorksheet(
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

const getWorksheetEmployeeDetail = async (req, res) => {
    try {
        const data = await worksheetModel
            .getWorkSheetOfWeekEmployee(
                req.query.start_date,
                req.query.end_date,
                req.query.employee_id
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


module.exports = {
    createWorksheet,
    getWorkSheetOfWeek,
    updateWorksheet,
    deleteWorksheet,
    getWorksheetDetail,
    getWorksheetEmployeeDetail
}