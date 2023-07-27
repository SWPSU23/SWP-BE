const express = require('express')
const router = express.Router()
const checkInOutController = require('../controllers/checkInOuts.Controller')
const authMiddleware = require('../middlewares/auth.Middleware')

const updateCheckInOut = authMiddleware.authentification('update', 'checkInOut');


router
    .route('/checkin')
    .put(updateCheckInOut, checkInOutController.updateCheckIn);

router
    .route('/checkout')
    .put(updateCheckInOut, checkInOutController.updateCheckOut);

/**
 * @swagger
 * tags:
 *   name: CheckInOut
 *   description: Check in out management
 */

/**
 * @swagger
 * /checkInOut/checkin:
 *   put:
 *     tags: [CheckInOut]
 *     summary: Update check in time
 *     description: Only employee can access
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CheckInOut"
 *           example:
 *             employee_id: 1
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /checkInOut/checkout:
 *   put:
 *     tags: [CheckInOut]
 *     summary: Update check in time
 *     description: Only employee can access
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CheckInOut"
 *           example:
 *             employee_id: 1
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CheckInOut:
 *       type: object
 *       properties:
 *         employee_id:
 *           type: integer
 *       required:
 *         - employee_id
 */


module.exports = router