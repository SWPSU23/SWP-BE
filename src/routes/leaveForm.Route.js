const express = require('express');
const router = express.Router();
const leaveFormController = require('../controllers/leaveForm.Controller');
const authMiddleware = require('../middlewares/auth.Middleware');

const readLeaveForm = authMiddleware.authentification('readAll', 'leaveForm');
const createLeaveForm = authMiddleware.authentification('create', 'leaveForm');
const updateLeaveForm = authMiddleware.authentification('update', 'leaveForm');
const readDetailLeaveForm = authMiddleware.authentification('readDetail', 'leaveForm');

router
    .route('/')
    .get(readLeaveForm, leaveFormController.getAllLeaveForm)
    .post(createLeaveForm, leaveFormController.createLeaveForm)

router
    .route('/employee/:employee_id')
    .get(readDetailLeaveForm, leaveFormController.getLeaveFormByEmployee)

router
    .route('/:id')
    .put(updateLeaveForm, leaveFormController.updateLeaveForm)

/**
 * @swagger
 * tags:
 *   name: LeaveForm
 *   description: Leave management
 */

/**
 * @swagger
 * /leaveForm:
 *   get:
 *     summary: Get list leave form
 *     description: Only admin is allowed
 *     tags: [LeaveForm]
 *     parameters:
 *     - in: query
 *       name: page_index
 *       required: true
 *       type: integer
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 * 
 *   post:
 *     summary: Create a new leave form
 *     description: Only employee is allowed
 *     tags: [LeaveForm]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             href: #/components/schemas/LeaveForm
 *           example:
 *             employee_id: 7
 *             start_date_of_leave: 2023-07-16
 *             end_date_of_leave: 2021-07-18
 *             reason_leave: "I'm sick"
 *     responses:
 *       201:
 *         description: Created leave form successfully
 *       400:
 *         description: Bad request     
 */

/**
 * @swagger
 * /leaveForm/employee/{employee_id}:
 *   get:
 *     summary: Get list leave form by employee
 *     description: Only employee is allowed
 *     tags: [LeaveForm]
 *     parameters:
 *     - in: path
 *       name: employee_id
 *       required: true
 *       type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /leaveForm/{id}:
 *   put:
 *     summary: Update leave form
 *     description: Only admin is allowed
 *     tags: [LeaveForm]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       type: integer
 *       description: Leave form id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             href: #/components/schemas/LeaveForm
 *           example:
 *             status: rejected
 *             manager_replied: "You are not allowed to take leave"
 *     responses:
 *       200:
 *         description: Updated leave form successfully
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     LeaveForm:
 *       type: object
 *       properties:
 *         employee_id:
 *           type: string
 *           required: true
 *         number_of_leave_days_used:
 *           type: number
 *           description: Total number of leave days used
 *         start_date_of_leave:
 *           type: string
 *           format: date-time
 *           description: Start date of leave
 *         end_date_of_leave:
 *           type: string
 *           format: date-time
 *           description: End date of leave
 *         reason_leave:
 *           type: string
 *           description: Reason leave
 *       required:
 *         - employee_id
 */

module.exports = router;