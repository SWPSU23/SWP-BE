const express = require('express');
const router = express.Router();


router.use('/product', require('./productRoute'));
module.exports = router;