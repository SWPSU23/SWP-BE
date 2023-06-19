const express = require('express')
const router = express.Router()
//generate swagger docs
router.use('/asset', require('./assetRoute'));
router.use('/product', require('./productRoute'));
router.use('/employee', require('./employeeRoute'));
router.use('/order', require('./orderRoute'));
router.use('/orderProduct', require('./orderProductRoute'));
module.exports = router