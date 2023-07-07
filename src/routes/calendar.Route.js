const express = require('express')
const router = express.Router()
const calendarController = require('../controllers/calendar.Controller')
router.route('/')
    .post(calendarController.createCalendar)
    .get(calendarController.getDayCalendar)

router
    .route('/:date')
    .put(calendarController.updateCalendar)



/**
 * @swagger
 * tags: 
 *  name: Calendar
 * description: Calendar management
 */

/**
 * @swagger
 * /calendar:
 *   post:
 *     summary: Create calendar
 *     tags: [Calendar]
 *     responses:
 *       200:
 *         description: The calendar was created successfully
 *       400:
 *         description: Bad request
 *   
 *   get:
 *     summary: Get day calendar
 *     tags: [Calendar]
 *     parameters:
 *       - in: query
 *         name: start_day
 *         type: string
 *         required: true
 *       - in: query
 *         name: end_day
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: The calendar was get successfully
 *       400:
 *         description: Bad request    
 */

/**
 * @swagger
 * /calendar:
 *   put:
 *     summary: Update calendar
 *     tags: [Calendar]
 *     parameters:
 *       - in: query
 *         name: date
 *         type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Calendar"
 *     responses:
 *       200:
 *         description: The calendar was created successfully
 *       400:
 *         description: Bad request
 *   
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Calendar:
 *       type: object
 *       properties:
 *         isSpecialDay:
 *           type: string
 *       required:
 *         - isSpecialDay
 */

module.exports = router