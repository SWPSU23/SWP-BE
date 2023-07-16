const employeesModel = require('../models/employees.Model');
const employeesValidation = require('../validations/employees.Validation');


const createEmployeeDetail = (req, res) => {
    employeesValidation
        .createEmployee(req.body)
        .then((data) => {
            employeesModel
                .createEmployeeDetail(data)
                .then((data) => {
                    res.status(200).send({
                        success: true,
                        data: data
                    })
                })
                .catch((error) => {
                    res.status(500).send({
                        success: false,
                        message: error.message
                    })
                })
        })
        .catch((error) => {
            res.status(400).send({
                success: false,
                message: error.message
            })
        })
}

const getListEmployee = (req, res) => {
    employeesModel
        .getListEmployee(req.query.page_index)
        .then((data) => {
            res.status(200).send({
                success: true,
                data: data
            })
        })
        .catch((error) => {
            res.status(500).send({
                success: false,
                message: error.message
            })
        })
}

const getEmployeeDetail = (req, res) => {
    employeesModel
        .getEmployeeDetail(req.params.id)
        .then((data) => {
            res.status(200).send({
                success: true,
                data: data
            })
        })
        .catch((error) => {
            res.status(500).send({
                success: false,
                message: error.message
            })
        })
}

const updateEmployeeDetail = (req, res) => {
    employeesValidation
        .updateEmployee(req.body, req.params.id)
        .then((data) => {
            employeesModel
                .updateEmployeeDetail(data, req.params.id)
                .then((data) => {
                    res.status(200).send({
                        success: true,
                        data: data
                    })
                })
                .catch((error) => {
                    res.status(500).send({
                        success: false,
                        message: error.message
                    })
                })
        })
        .catch((error) => {
            res.status(400).send({
                success: false,
                message: error.message
            })
        })
}

const deleteEmployeeDetail = (req, res) => {
    employeesModel
        .deleteEmployeeDetail(req.params.id)
        .then((data) => {
            res.status(200).send({
                success: true,
                data: data
            })
        })
        .catch((error) => {
            res.status(500).send({
                success: false,
                message: error.message
            })
        })
}

const searchEmployeeBy = (req, res) => {
    employeesModel
        .searchEmployeeBy(req.query.searchBy, req.query.keywords)
        .then((data) => {
            res.status(200).send({
                success: true,
                data: data
            })
        })
        .catch((error) => {
            res.status(500).send({
                success: false,
                message: error.message
            })
        })
}

module.exports = {
    createEmployeeDetail,
    getListEmployee,
    getEmployeeDetail,
    updateEmployeeDetail,
    deleteEmployeeDetail,
    searchEmployeeBy
}
