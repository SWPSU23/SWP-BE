const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController')

// create new product
router.post('/', productsController.createProductDetail);
// get deatil product
router.get('/:id')

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: User management
 */

/**
 * @swagger
 * /api/product:
 *  post:
 *   summary: Create new Product
 *  tags: [Products]
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


module.exports = router;
