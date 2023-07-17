const employeesModel = require('../models/employees.Model');
const employeesValidation = require('../validators/employees.Validator');


const createEmployeeDetail = async (req, res) => {
    try {

        const results = await employeesModel
            .createEmployeeDetail(
                await employeesValidation.validateCreateEmployee(req.body)
            );
        // 201 meaning resource created successfully
        res
            .status(201)
            .send({
                success: true,
                data: results
            })
    } catch (error) {

        if (error.message === "Email is existed" || error.message === "Phone number is existed") {
            res
                .status(400)
                .send({
                    success: false,
                    message: error.message
                })
        }

        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const getListEmployee = async (req, res) => {
    try {
        const data = await employeesModel
            .getListEmployee(req.query.page_index);
        res
            .status(200)
            .send({
                success: true,
                data: data
            })
    } catch (error) {
        res
            .status(500)
            .send({
                success: false,
                message: error.message
            })
    }
}

const getEmployeeDetail = async (req, res) => {
    try {
        const data = await employeesModel.getEmployeeDetail(req.params.id);
        res
            .status(200)
            .send({
                success: true,
                data: data
            })
    } catch (error) {
        res
            .status(500)
            .send({
                success: false,
                message: error.message
            })
    }
}

const updateEmployeeDetail = async (req, res) => {
    try {
        const results = employeesModel.updateEmployeeDetail(
            await employeesValidation.validateUpdateEmployee(
                req.body,
                req.params.id
            ),
            req.params.id
        );
        res
            .status(200)
            .send({
                success: true,
                data: results
            })
    } catch (error) {
        if (error.message === "Email is existed" || error.message === "Phone number is existed") {
            res
                .status(400) // 400 meaning bad request
                .send({
                    success: false,
                    message: error.message
                })
        }
        res
            .status(500)
            .send({
                success: false,
                message: error.message
            })
    }
}

const deleteEmployeeDetail = (req, res) => {
    try {
        const results = employeesModel.deleteEmployeeDetail(req.params.id);
        global.logger.debug(`Controller - Delete employee success: ${results}`);
        res.status(200).send({
            success: true,
            data: results
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const searchEmployeeBy = (req, res) => {
    try {
        const results = employeesModel.searchEmployeeBy(req.query.search_by, req.query.keywords);
        global.logger.debug(`Controller - Search employee success: ${results}`);
        res
            .status(200)
            .send({
                success: true,
                data: results
            })
    } catch (error) {
        res
            .status(500)
            .send({
                success: false,
                message: error.message
            })
    }
}

module.exports = {
    createEmployeeDetail,
    getListEmployee,
    getEmployeeDetail,
    updateEmployeeDetail,
    deleteEmployeeDetail,
    searchEmployeeBy
}
