const express = require('express');
const router = express.Router();
const orderProductController = require('../controllers/orderProducts.Controller');

router
    .route('/')
    .post(orderProductController.createListOrderProduct)
    .get(orderProductController.getListDetailOrder)
    .put(orderProductController.updateOrderProduct)

router
    .route('/:id')
    .delete(orderProductController.deleteOrderProduct)

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
 *               $ref: '#/components/schemas/OrderProduct'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 * 
 *   get:
 *     summary: Get list order products
 *     description: Manage list order products
 *     tags: [OrderProduct]
 *     parameters:
 *     - name: order_id
 *       in: query
 *       required: true
 *       description: Id of Order
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 * 
 *   put:
 *     summary: Update order products
 *     description: Only cashier can update
 *     tags: [OrderProduct]   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
*            schema:
 *             $ref: '#/components/schemas/UpdateOrderProductsRequest'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request  
 */

/**
 * @swagger
 * /orderProduct/{id}:
 * 
 *   delete:
 *     summary: Delete order products
 *     description: Only cashier can delete
 *     tags: [OrderProduct]
 *     parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       type: integer
 *       description: Id of OrderProduct
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
 *               price:
 *                 type: number
 *               total:
 *                 type: number
 *         order:
 *           type: object
 *           properties:
 *             product_quantity:
 *               type: integer
 *               format: int64
 *             total_price:
 *               type: number
 *       required:
 *         - order_id
 *         - products
 *         - order
 * 
 *     UpdateOrderProductsRequest:
 *       type: object
 *       properties:
 *         order:
 *           type: object
 *           properties:
 *             order_id:
 *               type: string
 *             employee_id:
 *               type: string
 *             total_price:
 *               type: number
 *         orderProduct:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               unit_price:
 *                 type: number
 *               total:
 *                 type: number
 */

module.exports = router;