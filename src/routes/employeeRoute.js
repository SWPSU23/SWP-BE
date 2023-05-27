const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');

// create a new employee
router.post('/', employeesController.createEmployeeDetail);
//get list of employees
router.get('/', employeesController.getListEmployee);
/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: User management
 */

/**
 * @swagger
 * /api/employee:
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
 * /api/employee:
 *  get:
 *   summary: Get list Employee
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
module.exports = router;