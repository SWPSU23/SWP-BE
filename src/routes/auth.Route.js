const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.Controlller')

router.post('/login', authController.login)
router.get('/logout', authController.logout)


/**
 * @swagger
 * tags:
 *  name: Authorization
 *  description: API to manage your authorization.
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     description: Authontication login
 *     tags: [Authorization]
 *    security:
 *     - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Authorization"
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout
 *     description: Authontication logout
 *     tags: [Authorization]
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Authorization:
 *       type: object
 *       properties:
 *         phone:
 *           type: string
 *           minLength: 9
 *           maxLength: 32
 *           example: 1234567890
 *         password:
 *           type: string
 *           example: $2b$10$ARPMP1cilWm7xvNBc2CzTOuXWE6WGPldnmF0nU21TcIEjcq7zNVi
 *       required:
 *         - phone
 *         - password
 */

module.exports = router
