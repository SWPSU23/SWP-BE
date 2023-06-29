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
    .route('/search')
    .get(productsController.searchProductBy);

router
    .route('/:id')
    // get product details
    .get(productsController.getProductByID)
    // update product by ID
    .put(productsController.updateProductByID)
    // delete product by ID
    .delete(productsController.deleteProductByID)

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Manager manage products
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get list of products
 *     description: Retrieves a list of products
 *     tags: [Products]
 *     parameters:
 *     - name: page_index
 *       in: query
 *       description: Page index
 *       required: true
 *       type: integer
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 * 
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product
 *     tags:
 *       - Products
 *     parameters: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Product"
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get product details by ID
 *     description: Retrieves product details based on the provided ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *
 *   put:
 *     summary: Update product by ID
 *     description: Updates a product based on the provided ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Product"
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 * 
 *   delete:
 *     summary: Delete product by ID
 *     description: Deletes a product based on the provided ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /product/search:
 *   get:
 *     summary: Search product by keyword
 *     description: Search product by keyword
 *     tags: [Products]
 *     parameters:
 *      - name: searchBy
 *        in: query
 *        description: Field to search
 *        required: true
 *        type: string
 *      - name: keywords
 *        in: query
 *        description: Keywords to search
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 5
 *           maxLength: 32
 *         description:
 *           type: string
 *           minLength: 5
 *           maxLength: 102
 *         unit:
 *           type: string
 *           minLength: 1
 *           maxLength: 32
 *         unit_price:
 *           type: number
 *           minimum: 100
 *         stock:
 *           type: integer
 *           minimum: 1
 *         image:
 *           type: string
 *           minLength: 1
 *           maxLength: 102
 *         expired_at:
 *           type: string
 *       required:
 *         - name
 *         - description
 *         - unit
 *         - unit_price
 *         - stock
 *         - image
 *         - expired_at
 */
module.exports = router
