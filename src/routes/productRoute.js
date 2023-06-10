const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController')

router.route('/')
  // get list of products
  .get(productsController.getListProduct)
  // create a new product
  .post(productsController.createProductDetail);

router
  .route('/search')
  .post(productsController.searchProductBy);

router
  .route('/:id')
  // get product details
  .get(productsController.getProductByID)
  // update product by ID
  .put(productsController.updateProductByID)
  // delete product by ID
  .delete(productsController.deleteProductByID);
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /v1/product:
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
 * *  get:
 *   summary: get list of product
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
 * /v1/product/:id:
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
 * put:
 *   summary: update product by id
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
 *  delete:
 *   summary: delete product by id
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
