const express = require('express')
const router = express.Router()
const assetsController = require('../controllers/assetsController')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router
    .route('/product/images/')
    .post(upload.single('file'), assetsController.uploadProductImage)

router
    .route('/product/images/:id')
    .get(assetsController.getProductImage)

/**
 * @swagger
 * tags:
 *   name: Asset Management
 *   description: Only manager access to asset management
 */

/**
 * @swagger
 * /asset/product/images/{id}:
 *   get:
 *     summary: Get product image
 *     description: Retrieve product image
 *     tags: [Asset Management]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Id of the product image
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 * 
 */

/**
 * @swagger
 * /asset/product/images/:
 *   post:
 *     summary: Upload product image
 *     description: Only manager access to asset management
 *     tags: [Asset Management]
 *     requestBody:
 *        required: true
 *        content: 
 *          multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              file:
 *               type: string
 *               format: binary
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 * 
 */
module.exports = router