const express = require('express')
const router = express.Router()
const assetsController = require('../controllers/assets.Controller')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const authMiddleware = require('../middlewares/auth.Middleware')

const readAsset = authMiddleware.authentification('read', 'asset')
const createAsset = authMiddleware.authentification('create', 'asset')

router
    .route('/product/images/')
    .post(
        createAsset,
        upload.single('file'),
        assetsController.uploadProductImage
    )

router
    .route('/product/images/:id')
    .get(readAsset, assetsController.getProductImage)
router
    .route('/salary/pdf/:employee_id/:month_year')
    .get(assetsController.getSalaryPdf)

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

/**
 * @swagger
 * /asset/salary/pdf/{employee_id}/{month_year}:
 *   get:
 *     summary: Get product image
 *     description: Retrieve product image
 *     tags: [Asset Management]
 *     parameters:
 *     - name: employee_id
 *       in: path
 *       description: Id of the employee
 *       required: true
 *       type: string
 *     - name: month_year
 *       in: path
 *       description: Month and year of the pay slip
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *        description: Not found
 */
module.exports = router
