/**
 * @swagger
 * tags:
 *   name: Products
 *   description: User management
 */
const express = require('express');
const router = express.Router();

router.get('/:id',);

/**
 * @swagger
 * /api/user/getListProduct:
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
// Get list users
router.get('/');

/**
 * @swagger
 * /api/product/:id:
 *  get:
 *   summary: Get Product details
 *  tags: [Product]
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
// Get Product details

module.exports = router;
