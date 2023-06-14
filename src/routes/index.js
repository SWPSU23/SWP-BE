const express = require('express');
const router = express.Router();

router.use('/asset', require('./assetRoute'));
router.use('/product', require('./productRoute'));
router.use('/employee', require('./employeeRoute'));
module.exports = router;