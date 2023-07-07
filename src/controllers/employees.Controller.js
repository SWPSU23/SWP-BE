const employeesModel = require('../models/employees.Model')

const createEmployeeDetail = (req, res) => {
    employeesModel
        .createEmployeeDetail(req.body)
        .then((data) => {
            res.status(200).send({
                message: 'Successfully created employee',
                data: data,
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Error creating employee',
                error: error.message,
            })
        })
}

const getListEmployee = (req, res) => {
    employeesModel
        .getListEmployee(req.query.page_index)
        .then((data) => {
            res.status(200).send({
                message: 'Successfully get employee list',
                data: data,
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Error getting employee list',
                error: error.message,
            })
        })
}

const getEmployeeDetail = (req, res) => {
    employeesModel
        .getEmployeeDetail(req.params.id)
        .then((data) => {
            res.status(200).send({
                message: 'Get employee detail successfully',
                data: data,
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Error getting employee detail',
                error: error.message,
            })
        })
}

const updateEmployeeDetail = (req, res) => {
    employeesModel
        .updateEmployeeDetail(req.body, req.params.id)
        .then((data) => {
            res.status(200).send({
                message: 'Employee updated successfully',
                data: data,
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Error updating employee',
                error: error,
            })
        })
}

const deleteEmployeeDetail = (req, res) => {
    employeesModel
        .deleteEmployeeDetail(req.params.id)
        .then((data) => {
            res.status(200).send({
                message: 'Employee deleted successfully',
                data: data,
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Error deleting employee',
                error: error,
            })
        })
}

const searchEmployeeBy = (req, res) => {
    employeesModel
        .searchEmployeeBy(req.query.searchBy, req.query.keywords)
        .then((data) => {
            res.status(200).send({
                message: 'Search employee successfully',
                data: data,
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Error searching employee',
                error: error,
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
