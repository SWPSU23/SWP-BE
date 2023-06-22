const express = require('express');
const router = express.Router();
const orderProductController = require('../controllers/orderProductsController');

router
    .route('/')
    .post(orderProductController.createListOrderProduct);

router
    .route('/delete')
    .delete(orderProductController.deleteOrderProduct)

router
    .route('/update')
    .put(orderProductController.updateOrderProduct)

router
    .route('/:id')
    .get(orderProductController.getListOrderProduct)

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
 * /orderProduct/update:
 *   put:
 *     summary: Update order products
 *     description: Only cashier can update
 *     tags: [OrderProduct]
 *     parameters:
 *     - name: product_id
 *       in: query
 *       required: true
 *       type: integer
 *       description: Id of Product
 *     - name: order_id
 *       in: query
 *       required: true
 *       type: integer
 *       description: Id of Order     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object              
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /orderProduct/delete:
 *  delete:
 *     summary: Delete order products
 *     description: Only cashier can delete
 *     tags: [OrderProduct]
 *     parameters:
 *     - name: product_id
 *       in: query
 *       required: true
 *       type: integer
 *       description: Id of Product
 *     - name: order_id
 *       in: query
 *       required: true
 *       type: integer
 *       description: Id of Order
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /orderProduct/{id}:
 *   get:
 *     summary: Get list order products
 *     description: Manage list order products
 *     tags: [OrderProduct]
 *     parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       description: Id of Order
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 * 
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