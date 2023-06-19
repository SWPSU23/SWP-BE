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

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Manager manage products
 */

/**
 * @swagger
 * /employee:
 * 
 *   get:
 *     summary: Get list of employees
 *     description: Only manager can access 
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: Successful operation
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
 *             password: hcb123
 *             phone: 1234567890
 *             base_salary: 1000
 *             role: manager      
 *     responses:
 *       200:
 *         description: Successful operation
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
 *         description: Successful operation
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
 *             password: hcb123
 *             phone: 1234567890
 *             base_salary: 1000
 *             role: manager      
 *     responses:
 *       200:
 *         description: Successful operation
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
 *             password: hcb123
 *             phone: 1234567890
 *             base_salary: 1000
 *             role: manager      
 *     responses:
 *       200:
 *         description: Successful operation
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
 *         description: Successful operation  
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
 *         password:
 *           type: string
 *           minLength: 5
 *         phone:
 *           type: number
 *           minimum: 9
 *         base_salary:
 *           type: number
 *           minimum: 1000
 *         role:
 *           type: string
 *       required:
 *         - name
 *         - age
 *         - email_address
 *         - password
 *         - phone
 *         - base_salary
 *         - role
 */
