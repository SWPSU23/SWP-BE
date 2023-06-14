const express = require('express')
const router = express.Router()
const employeesController = require('../controllers/employeesController')

router
    .route('/')
    // get list of employees
    .get(employeesController.getListEmployee)
    // create a new employee
    .post(employeesController.createEmployeeDetail)

router
    .route('/:id')
    // get employee details
    .get(employeesController.getEmployeeDetail)
    // update employee details
    .put(employeesController.updateEmployeeDetail)
    // delete employee details
    .delete(employeesController.deleteEmployeeDetail)
module.exports = router
