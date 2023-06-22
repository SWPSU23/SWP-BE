const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController')

router
    .route('/')
    .post(ordersController.createOrder)
    .get(ordersController.getListOrder)

router
    .route('/search')
    .get(ordersController.searchOrder)

router
    .route('/id')
    .delete(ordersController.deleteOrder)
    .put(ordersController.updateOrder)
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Crashier manage order
 */

/**
 * @swagger
 * /order:
 *  post:
 *     summary: Create a new order
 *     description: Only crashier can access
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             href: #/components/schemas/Order
 *           example:
 *             employee_id: 6
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 * 
 *  get:
 *     summary: Get list order
 *     description: Only cashier is allowed
 *     tags : [Orders]
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /order/{id}:
 *  delete:
 *     summary: Delete the order
 *     description: Only cashier is allowed
 *     tags : [Orders]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Id of the order
 *        required: true
 *        type: int
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *  
 *  put: 
 *     summary: Update the order
 *     description: Only cashier is allowed
 *     tags : [Orders]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Id of the order
 *       type: int
 *     requestBody:
 *       description: 
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
 *     Order:
 *       type: object
 *       properties:
 *         employee_id:
 *           type: string
 *           required: true
 *         create_at:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp of the order
 *         status:
 *           type: string
 *           description: The status of the order
 *           default: succeed
 *       required:
 *         - employee_id
 */
module.exports = router