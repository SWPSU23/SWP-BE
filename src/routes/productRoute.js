const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController')

// create new product
router.post('/createProductDetail', productsController.createProductDetail);
// get list product
router.get('/getListProduct', productsController.getListProduct);
// get product by id
router.get('/getProductByID/:id', productsController.getProductByID);
// update product by id
router.put('/updateProductByID/:id', productsController.updateProductByID);
// delete product by id
router.delete('/deleteProductByID/:id', productsController.deleteProductByID);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/product/createProductDetail:
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
 * /api/product/getListProduct:
 *  get:
 *   summary: Get list of Product
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
 * /api/product/getProductByID/:id:
 *  get:
 *   summary: Get Product by ID
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
 * /api/product/updateProductByID/:id;
 *  put:
 *   summary: Update Product by ID
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
 * /api/product/deleteProductByID/:id;
 *  put:
 *   summary: Delete Product by ID
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
