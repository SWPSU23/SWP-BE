const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController')

router
    .route('/')
    .post(ordersController.createOrder)

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
 *             type: objet
 *             properties:
 *               name: employee_id
 *               type: int
 *               required: true
 *           example:
 *             employee_id: 6
 *     responses:
 *       200:
 *        description: Successful operation
 */

module.exports = router