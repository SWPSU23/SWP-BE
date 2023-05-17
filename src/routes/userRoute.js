/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

const express = require('express');
const router = express.Router();
const usersMiddleware = require('../middlewares/usersMiddleware')
const usersController = require('../controllers/usersController');
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns the list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router
  .route('/users/getListUsers')
  .get((req, res) => { usersMiddleware.getListUser(req, res), usersController.getListUser(req, res) })

module.exports = router;
