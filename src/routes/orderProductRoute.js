const express = require('express');
const router = express.Router();
const orderProductController = require('../controllers/orderProductsController');

router
    .route('/')
    .post(orderProductController.createListOrderProduct)


/**
 * @swagger
 * tags:
 *   name: OrderProduct
 *   description: Manage list order products
 */

/**
 * @swagger
 * /orderProduct:
 *   post:
 *     summary: Create order products
 *     description: Manage list order products
 *     tags: [OrderProduct]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/OrderProduct'
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
 *     OrderProduct:
 *       type: object
 *       properties:
 *         order_id:
 *           type: integer
 *           format: int64
 *         product_id:
 *           type: integer
 *           format: int64
 *         quantity:
 *           type: integer
 *           format: int32
 *         price:
 *           type: number
 *       required:
 *         - order_id
 *         - product_id
 *         - quantity
 *         - price
 */

module.exports = router;