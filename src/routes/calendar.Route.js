const express = require('express')
const router = express.Router()
const calendarController = require('../controllers/calendar.Controller')
router.route('/')
    .get(calendarController.getDayCalendar)

router
    .route('/:date')
    .put(calendarController.updateCalendar)

router
    .route('/day-of-week')
    .get(calendarController.getListDayOfWeek)

router
    .route('/month-of-year')
    .get(calendarController.getListMonthOfYear)


/**
 * @swagger
 * tags: 
 *  name: Calendar
 * description: Calendar management
 */

/**
 * @swagger
 * /calendar:
 *   
 *   get:
 *     summary: Get day calendar
 *     tags: [Calendar]
 *     parameters:
 *       - in: query
 *         name: start_day
 *         type: string
 *         required: true
 *         example: 2023-07-20
 *       - in: query
 *         name: end_day
 *         type: string
 *         required: true
 *         example: 2023-07-30
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
 * /calendar/day-of-week:
 *   get:
 *     summary: Get list day of week
 *     tags: [Calendar]
 *     responses:
 *       200:
 *         description: The list day of week was get successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /calendar/month-of-year:
 *   get:
 *     summary: Get list month of year
 *     tags: [Calendar]
 *     responses:
 *       200:
 *         description: The list month of year was get successfully
 *       400:
 *         description: Bad request
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