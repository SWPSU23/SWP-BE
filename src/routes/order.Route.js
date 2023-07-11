const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.Controller')

router
    .route('/')
    .post(ordersController.createOrder)
    .get(ordersController.getListOrder)

router
    .route('/search')
    .get(ordersController.searchOrder)

router
    .route('/:id')
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
 *     parameters:
 *       - name: page_index
 *         in: query
 *         description: Page index
 *         required: true
 *         type: int
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
 *     description: Only crashier can access
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id of the order
 *         required: true
 *         type: int
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             href: #/components/schemas/Order
 *           example:
 *             product_quantity: 10
 *             total_price: 100000
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */


/**
 * @swagger
 * /order/search:
 *  get:
 *     summary: Create a new order
 *     description: Only crashier can access
 *     tags: [Orders]
 *     parameters:
 *      - name: searchBy
 *        in: query
 *        description: Field to search
 *        required: true
 *        type: string
 *      - name: keywords
 *        in: query
 *        description: Keywords to search
 *        required: true
 *        type: string        
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
 *         total_price:
 *           type: number
 *           description: The total price of the order
 *         product_quantity:
 *           type: number
 *           description: The total quantity of the order
 *       required:
 *         - employee_id
 */
module.exports = router