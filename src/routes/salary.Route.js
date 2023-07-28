const express = require('express')
const router = express.Router()
const salaryController = require('../controllers/salaries.Controller')
const authMiddleware = require('../middlewares/auth.Middleware')

router
    .route('/payRoll')
    .get(authMiddleware.authentification('readPayRoll', 'salary'), salaryController.getPayRoll)

router
    .route('/paySlipDetails/:employee_id')
    .get(authMiddleware.authentification('readPaySlip', 'salary'), salaryController.getPaySlipDetails)
router
    .route('/paySlip/:employee_id')
    .get(authMiddleware.authentification('readPaySlip', 'salary'), salaryController.getPaySlip)

/**
 * @swagger
 *   tags:
 *   name: Salary
 *   description: The salary managing API
 */

/**
 * @swagger
 * /salary/payRoll:
 *   get:
 *     summary: Get pay roll
 *     tags: [Salary]
 *     parameters:
 *     - in: query
 *       name: month_year
 *       type: string
 *       required: true
 *       description: The month and year
 *       example: 2023-07
 *     responses:
 *       200: 
 *         description: The pay roll details
 *       400:
 *         description: The pay roll details not found
 */

/**
 * @swagger
 * /salary/paySlip/{employee_id}:
 *   get:
 *     summary: Get pay slip 
 *     tags: [Salary]
 *     parameters:
 *     - in: path
 *       name: employee_id
 *       type: string
 *       required: true
 *       description: The employee id
 *     - in: query
 *       name: month_year
 *       type: string
 *       required: true
 *       description: The month and year
 *       example: 2023-07
 *     responses:
 *       200:
 *         description: The pay slip details
 *       404:
 *         description: The pay slip details not found
 */

/**
 * @swagger
 * /salary/paySlipDetails/{employee_id}:
 *   get:
 *     summary: Get pay slip details
 *     tags: [Salary]
 *     parameters:
 *     - in: path
 *       name: employee_id
 *       type: string
 *       required: true
 *       description: The employee id
 *     - in: query
 *       name: month_year
 *       type: string
 *       required: true
 *       description: The month and year
 *       example: 2023-07
 *     responses:
 *       200:
 *         description: The pay slip details
 *       404:
 *         description: The pay slip details not found
 */

module.exports = router;

