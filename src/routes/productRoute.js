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
 *     responses:
 *       200:
 *         description: Successful operation
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
 *             $ref: "#/definitions/Product"
 *           example:
 *             name: huynh chi bao
 *             description: nuoc ngot hao han
 *             unit: nuoc ngot
 *             unit_price: 500
 *             stock: 100
 *             image: https://content.etilize.com/Original/1029886380.jpg
 *             expired_at: 2029-05-30 21:17:57
 *     responses:
 *       200:
 *        description: Successful operation
 
 * definitions:
 *           Product:
 *               type: object
 *               properties:
 *               name:
 *                   type: string
 *                   minLength: 5
 *                   maxLength: 32
 *               description:
 *                   type: string
 *                   minLength: 5
 *                   maxLength: 102
 *               unit:
 *                   type: string
 *                   minLength: 1
 *                   maxLength: 32
 *               unit_price:
 *                   type: number
 *                   minimum: 100
 *               stock:
 *                   type: integer
 *                   minimum: 1
 *               status:
 *                   type: boolean
 *                   default: true
 *               image:
 *                   type: string
 *               expired_at:
 *                   type: string
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
 *         description: Successful operation
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
 *             $ref: "#/definitions/Product"
 *           example:
 *             name: huynh chi bao
 *             description: nuoc ngot hao han
 *             unit: nuoc ngot
 *             unit_price: 500
 *             stock: 100
 *             image: https://content.etilize.com/Original/1029886380.jpg
 *             expired_at: 2029-05-30 21:17:57
 *     responses:
 *       200:
 *         description: Successful operation
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
 *         description: Successful operation
 */
module.exports = router
