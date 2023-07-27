const express = require('express')
const router = express.Router()
const employeesController = require('../controllers/employees.Controller')

const authMiddleware = require('../middlewares/auth.Middleware')

const readEmployee = authMiddleware.authentification('read', 'employee')
const createEmployee = authMiddleware.authentification('create', 'employee')
const updateEmployee = authMiddleware.authentification('update', 'employee')
const deleteEmployee = authMiddleware.authentification('delete', 'employee')
const readDetailEmployee = authMiddleware.authentification('readDetail', 'employee')

router
    .route('/')
    // get list of employees
    .get(readEmployee, employeesController.getListEmployee)
    // create a new employee
    .post(createEmployee, employeesController.createEmployeeDetail)

router
    .route('/search')
    .get(readEmployee, employeesController.searchEmployeeBy)

router
    .route('/forgot-password')
    .post(employeesController.updatePassWord)

router
    .route('/:id')
    // get employee details
    .get(readDetailEmployee, employeesController.getEmployeeDetail)
    // update employee details
    .put(updateEmployee, employeesController.updateEmployeeDetail)
    // delete employee details
    .delete(deleteEmployee, employeesController.deleteEmployeeDetail)

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Manager manage products
 */

/**
 * @swagger
 * /employee: 
 *   get:
 *     summary: Get list of employees
 *     description: Only manager can access 
 *     tags: [Employees]
 *     parameters:
 *     - name: page_index
 *       in: query
 *       description: Page index
 *       required: true
 *       type: number
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 * 
 *   post:
 *     summary: Create a new employee
 *     description: Only manager can access 
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Employee"
 *           example:
 *             name: huynh chi bao
 *             age: 17
 *             email_address: bb@gmail.com
 *             phone: "1234567890"
 *             base_salary: 1000
 *             role: manager      
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * 
 */

/**
 * @swagger
 * /employee/{id}:
 * 
 *   get:
 *     summary: Get details of employee
 *     description: Only manager can access 
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id of the employee
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * 
 *   put:
 *     summary: Update a employee
 *     description: Only manager can access 
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id of employee
 *         required: true
 *         type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Employee"
 *           example:
 *             name: huynh chi bao
 *             age: 17
 *             email_address: bb@gmail.com
 *             phone: 1234567890
 *             base_salary: 1000
 *             role: manager      
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * 
 *   delete:
 *     summary: Delete a employee
 *     description: Only manager can access 
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id of the employee
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /employee/search:
 *   get:
 *     summary: Search employee by 
 *     description: Only manager can access 
 *     tags: [Employees]
 *     parameters:
 *       - name: searchBy
 *         in: query
 *         description: Search by name, age, email_address, phone, base_salary, role
 *         required: true
 *         type: string
 *       - name: keywords
 *         in: query
 *         description: Keywords to search
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * 
 */

/**
 * @swagger
 * /employee/forgot-password:
 *   post:
 *     summary: Update password
 *     description: Employee can access
 *     tags: [Employees]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Employee"
 *           example:
 *             email_address: bb@gmail.com       
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server errors
 *                 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *         age:
 *           type: number
 *           minimum: 16
 *         email_address:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         base_salary:
 *           type: number
 *           minimum: 1000
 *         role:
 *           type: string
 *       required:
 *         - name
 *         - age
 *         - email_address
 *         - phone
 *         - base_salary
 *         - role
 */

module.exports = router