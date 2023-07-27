const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/orders.Controller')
const authMiddleware = require('../middlewares/auth.Middleware')

const createOrder = authMiddleware.authentification('create', 'order')
const readOrder = authMiddleware.authentification('read', 'order')
const deleteOrder = authMiddleware.authentification('delete', 'order')

router
    .route('/')
    .post(createOrder, ordersController.createOrder)
    .get(readOrder, ordersController.getListOrder)

router
    .route('/search')
    .get(readOrder, ordersController.searchOrder)

router
    .route('/:id')
    .delete(deleteOrder, ordersController.deleteOrder)

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
 *             products:
 *               - product_id: 1
 *                 quantity: 2
 *               - product_id: 2
 *                 quantity: 1
 *             employee_id: 1
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
 *         products:
 *           type: array
 *           format: int64
 *           items:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 format: int64
 *               quantity:
 *                 type: integer
 *                 format: int32
 *         employee_id:
 *           type: integer
 *       required:
 *         - order_id
 *         - products
 *         - order
 */
module.exports = router
