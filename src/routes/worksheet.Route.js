const express = require('express');
const router = express.Router();
const worksheetController = require('../controllers/worksheets.Controller');

router
    .route('/')
    .post(worksheetController.createWorksheet)
    .get(worksheetController.getListWorksheet)

router
    .route('/search')
    .get(worksheetController.searchWorksheetBy)

router
    .route('/:id')
    .get(worksheetController.getWorksheetDetail)
    .put(worksheetController.updateWorksheet)
    .delete(worksheetController.deleteWorksheet)

/**
 * @swagger
 * tags:
 *  name: Worksheet
 *  description: API to manage your worksheets.
 */

/**
 * @swagger
 * /worksheet:
 *   get:
 *     summary: Get all worksheets
 *     tags: [Worksheet]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 * 
 *   post:
 *     summary: Create a new worksheet
 *     tags: [Worksheet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Worksheet"
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
*/

/**
 * @swagger
 * /worksheet/{id}:
 *   get:
 *     summary: Get a worksheet by ID
 *     tags: [Worksheet]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ID of worksheet
 *       required: true
 *       type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 * 
 *   put:
 *     summary: Update a worksheet
 *     tags: [Worksheet]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ID of worksheet
 *       required: true
 *       type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Worksheet"
 *     responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Internal Server Error
 * 
 *   delete:
 *     summary: Delete a worksheet
 *     tags: [Worksheet]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ID of worksheet
 *       required: true
 *       type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /worksheet/search:
 *   get:
 *     summary: Search worksheets by keywords
 *     tags: [Worksheet]
 *     parameters:
 *     - name: searchBy
 *       in: query
 *       description: Search by
 *       required: true
 *       type: string
 *     - name: keywords
 *       in: query
 *       description: Keywords
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 *       
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Worksheet:
 *       type: object
 *       properties:
 *         employee_id:
 *           type: integer
 *           description: The employee id
 *         sheet_id:
 *           type: integer
 *           description: The sheet id
 *         day:
 *           type: string
 *           description: The day
 *         
*/

module.exports = router