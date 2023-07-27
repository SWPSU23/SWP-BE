const express = require('express');
const router = express.Router();
const orderProductController = require('../controllers/orderProducts.Controller');
const authMiddleware = require('../middlewares/auth.Middleware');

const readOrderProduct = authMiddleware.authentification('read', 'orderProduct');

router
    .route('/:order_id')
    .get(readOrderProduct, orderProductController.getListDetailOrder)

/**
 * @swagger
 * tags:
 *   name: OrderProduct
 *   description: Manage list order products
 */

/**
 * @swagger
 * /orderProduct/{order_id}:
 *   get:
 *     summary: Get list order products
 *     description: Manage list order products
 *     tags: [OrderProduct]
 *     parameters:
 *     - name: order_id
 *       in: path
 *       required: true
 *       description: Id of Order
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */

module.exports = router;