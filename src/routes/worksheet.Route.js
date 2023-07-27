const express = require('express');
const router = express.Router();
const worksheetController = require('../controllers/worksheets.Controller');
const authMiddleware = require('../middlewares/auth.Middleware');

const createWorksheet = authMiddleware.authentification('create', 'worksheet');
const readWorksheet = authMiddleware.authentification('read', 'worksheet');
const updateWorksheet = authMiddleware.authentification('update', 'worksheet');
const deleteWorksheet = authMiddleware.authentification('delete', 'worksheet');
const readDetailWorksheet = authMiddleware.authentification('readDetail', 'worksheet');


router
    .route('/')
    .post(createWorksheet, worksheetController.createWorksheet)
    .get(readWorksheet, worksheetController.getWorkSheetOfWeek)

router
    .route('/employee')
    .get(readDetailWorksheet, worksheetController.getWorksheetEmployeeDetail)

router
    .route('/:id')
    .get(readDetailWorksheet, worksheetController.getWorksheetDetail)
    .put(updateWorksheet, worksheetController.updateWorksheet)
    .delete(deleteWorksheet, worksheetController.deleteWorksheet)

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
 *     summary: Get worksheet of week of all emplyoee
 *     tags: [Worksheet]
 *     description: Only manager can use this API
 *     parameters:
 *     - name: start_date
 *       in: query
 *       description: Start date
 *       required: true
 *       type: string
 *       example: 2023-07-12
 *     - name: end_date
 *       in: query
 *       description: End date
 *       required: true
 *       type: string
 *       example: 2023-07-18
 *     - name: role
 *       in: query
 *       description: Role of employee
 *       required: true
 *       example: cashier
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
 *             example:
 *               employee_id: 1
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
 * /worksheet/employee:
 *   get:
 *     summary: Get worksheet of week of an emplyoee
 *     tags: [Worksheet]
 *     description: Only employee can get his/her worksheet
 *     parameters:
 *     - name: start_date
 *       in: query
 *       description: Start date
 *       required: true
 *       example: 2023-07-12
 *       type: string
 *     - name: end_date
 *       in: query
 *       description: End date
 *       required: true
 *       example: 2023-07-18
 *       type: string
 *     - name: employee_id
 *       in: query
 *       description: ID of employee
 *       required: true
 *       example: 1
 *       type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Worksheet:
 *       type: object
 *       properties:
 *         worksheet:
 *           type: object
 *           properties:
 *             employee_id:
 *               type: integer
 *               format: int64
 *             sheet_id:
 *               type: integer
 *               format: int32
 *             date:
 *               type: string
 *         role:
 *           type: string
 *           description: Role of employee
 *       required:
 *         - order_id
 *         - products
 *         - order
 *         
*/

module.exports = router