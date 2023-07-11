const express = require("express");
const router = express.Router();
const categoryController = require('../controllers/categories.Controller');

router
    .route('/')
    .get(categoryController.getListCategory)
    .post(categoryController.createCategory);

router
    .route('/:name')
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get list of categories
 *     description: Only manager can access
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 * 
 *   post:
 *     summary: Create a new category
 *     description: Only manager can access
 *     tags: [Category]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Category"
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request      
 */

/**
 * @swagger
 * /category/{name}:
 *   put:
 *     summary: Update a category
 *     description: Only manager can access
 *     tags: [Category]
 *     parameters:
 *       - name: name
 *         in: path
 *         description: Category name
 *         required: true
 *         type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Category"
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 * 
 *   delete:
 *     summary: Delete a category
 *     description: Only manager can access
 *     tags: [Category]
 *     parameters:
 *       - name: name
 *         in: path
 *         description: Category name
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 * 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *       required:
 *         - name
 */

module.exports = router;