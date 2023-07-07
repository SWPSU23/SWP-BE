const express = require('express');
const router = express.Router();
const sheetsController = require('../controllers/sheets.Controller');

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
 *     summary: Create a new sheet
 *     description: Only admins can create other sheets.
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
 * 
 *   get:
 *     summary: Get list sheet
 *     description: Only admins can retrieve all sheets.
 *     tags:
 *       - Sheets
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request 
 */

/**
 * @swagger
 * /sheet/{id}:
 *   put:
 *     summary: Create a new sheet
 *     description: Only admins can create other sheets.
 *     tags:
 *       - Sheets
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of sheet
 *         required: true
 *         type: integer
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
 * 
 *   delete:
 *     summary: Get list sheet
 *     description: Only admins can retrieve all sheets.
 *     tags:
 *       - Sheets
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
 *         coefficient:
 *           type: number
 *           description: coefficient of sheet
 *       required:
 *         - start_time
 *         - end_time
 *         - coefficient
 */

module.exports = router;