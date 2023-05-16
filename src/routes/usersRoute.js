/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

const express = require('express');
const router = express.Router();
import { usersMiddleware } from '../middleware/usersMiddleware';
import { usersController } from '../controller/usersController';
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
  .route('/')
  .get((req, res) => { usersMiddleware.checkRole(req, res), usersController.getListUser(req, res) })

export const userRoute = router;
