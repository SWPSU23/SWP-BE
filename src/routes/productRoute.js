const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

router
    .route('/')
    // get list of products
    .get(productsController.getListProduct)
    // create a new product
    .post(productsController.createProductDetail)

router
    .route('/:id')
    // get product details
    .get(productsController.getProductByID)
    // update product by ID
    .put(productsController.updateProductByID)
    // delete product by ID
    .delete(productsController.deleteProductByID)
router.route('/search/by')
    .post(productsController.searchProductBy);
    
module.exports = router
