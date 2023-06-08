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

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: User management
 */

/**
 * @swagger
 * /v1/employee:
 *  get:
 *   summary: get list of employees
 *  tags: [Employees]
 * responses:
 * 200:
 * description: Success
 * 400:
 * description: Bad request
 * 401:
 * description: Unauthorized
 * 403:
 * description: Forbidden
 * 404:
 * description: Not found
 * 500:
 * description: Internal server error
 *
 *  post:
 *   summary: Create new Employee
 *  tags: [Employees]
 * responses:
 * 200:
 * description: Success
 * 400:
 * description: Bad request
 * 401:
 * description: Unauthorized
 * 403:
 * description: Forbidden
 * 404:
 * description: Not found
 * 500:
 * description: Internal server error
 *
 */

/**
 * @swagger
 * /v1/employee/:id:
 *  get:
 *   summary: get employee's details
 *  tags: [Employees]
 * responses:
 * 200:
 * description: Success
 * 400:
 * description: Bad request
 * 401:
 * description: Unauthorized
 * 403:
 * description: Forbidden
 * 404:
 * description: Not found
 * 500:
 * description: Internal server error
 *
 *  put:
 *    summary: update employe
 *  tags: [Employees]
 * responses:
 * 200:
 * description: Success
 * 400:
 * description: Bad request
 * 401:
 * description: Unauthorized
 * 403:
 * description: Forbidden
 * 404:
 * description: Not found
 * 500:
 * description: Internal server error
 *
 *  *  delete:
 *    summary: delete emplyee detail by id
 *  tags: [Employees]
 * responses:
 * 200:
 * description: Success
 * 400:
 * description: Bad request
 * 401:
 * description: Unauthorized
 * 403:
 * description: Forbidden
 * 404:
 * description: Not found
 * 500:
 * description: Internal server error
 */
module.exports = router
