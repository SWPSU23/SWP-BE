const express = require('express');
const router = express.Router();
const sheetsController = require('../controllers/sheetsController');

router
    .route('/')
    .post(sheetsController.createSheet)
    .get(sheetsController.getListSheet)

router
    .route('/:id')
    .put(sheetsController.updateSheet)
    .delete(sheetsController.deleteSheet)

/**
 * @swagger
 * tags:
 *  name: Sheets
 *  description: Sheet management
 */

/**
 * @swagger
 * /sheet:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product
 *     tags:
 *       - Sheets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Sheet"
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
 *     Sheet:
 *       type: object
 *       properties:
 *         start_time:
 *           type: time
 *           description: Start time of sheet
 *         end_time:
 *           type: time
 *           description: End time of sheet
 *         coficient:
 *           type: number
 *           description: Coficient of sheet
 *       required:
 *         - start_time
 *         - end_time
 *         - coficient
 */

module.exports = router;