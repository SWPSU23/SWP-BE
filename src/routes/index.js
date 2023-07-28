const express = require('express')
const router = express.Router()
//generate swagger docs
router.use('/asset', require('./asset.Route'));
router.use('/product', require('./product.Route'));
router.use('/employee', require('./employee.Route'));
router.use('/order', require('./order.Route'));
router.use('/orderProduct', require('./orderProduct.Route'));
router.use('/sheet', require('./sheet.Route'));
router.use('/worksheet', require('./worksheet.Route'));
router.use('/calendar', require('./calendar.Route'));
router.use('/category', require('./category.Route'));
router.use('/checkInOut', require('./checkInOut.Route'));
router.use('/auth', require('./auth.Route'));
router.use('/leaveForm', require('./leaveForm.Route'));
router.use('/salary', require('./salary.Route'));

module.exports = router
