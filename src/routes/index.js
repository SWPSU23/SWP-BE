const express = require('express');
const router = express.Router();


router.use('/product', require('./productRoute'));
router.use('/employee', require('./employeeRoute'));
module.exports = router;