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



module.exports = router;
