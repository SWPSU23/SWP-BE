/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

const express = require('express');
const router = express.Router();
// eslint-disable-next-line no-unused-vars
const usersMiddleware = require('../middlewares/usersMiddleware')
const userController = require('../controllers/userController');
/**
 * @swagger
 * /api/user/getListUser:
 *  get:
 *   summary: Get list users
 *  tags: [Users]
 * responses:
 * 200:
 * description: Success
 * 400:
 * description: Bad request
 * 401:
 * description: Unauthorized
 * 403:
 * description: Forbidden
 * 404:
 * description: Not found
 * 500:
 * description: Internal server error
 * 
  */
router.get('/getListUser', userController.getListUser);
module.exports = router;
