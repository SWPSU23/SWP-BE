const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController')

// create new product
router.post('/', productsController.createProductDetail);
// get list product
router.get('/', productsController.getListProduct);
// get product details
router.get('/:id', productsController.getProductById);
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

/**
 * @swagger
 * /api/product:
 *  get:
 *   summary: Get list of products
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

/**
 * @swagger
 * /api/product/:id:
 *  get:
 *   summary: Get product details
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
