const express = require('express')
const router = express.Router()
const assetsController = require('../controllers/assetsController')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router
    .route('/product/images/')
    .post(upload.single('file'), assetsController.uploadProductImage)

router.route('/product/images/:id').get(assetsController.getProductImage)

module.exports = router