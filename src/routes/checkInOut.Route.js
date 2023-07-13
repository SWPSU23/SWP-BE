const express = require('express')
const router = express.Router()
const checkInOutController = require('../controllers/checkInOuts.Controller')

router
    .route('/checkin/:worksheet_id')
    .put(checkInOutController.updateCheckIn);

router
    .route('/checkout/:worksheet_id/')
    .put(checkInOutController.updateCheckOut);

/**
 * @swagger
 * tags:
 *   name: CheckInOut
 *   description: Check in out management
 */

/**
 * @swagger
 * /checkInOut/checkin/{worksheet_id}:
 *   put:
 *     tags: [CheckInOut]
 *     summary: Update check in time
 *     description: Only employee can access
 *     parameters:
 *     - name: worksheet_id
 *       in: path
 *       required: true
 *       description: ID of worksheet
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /checkInOut/checkout/{worksheet_id}:
 *   put:
 *     tags: [CheckInOut]
 *     summary: Update check out time
 *     description: Only employee can access
 *     parameters:
 *     - name: worksheet_id
 *       in: path
 *       required: true
 *       description: ID of worksheet
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */



module.exports = router