const productsModel = require('../models/products.Model')

const createProductDetail = (req, res) => {
    productsModel
        .createProductDetails(req.body)
        .then((result) => {
            res.status(200).send({
                status: 'success',
                message: 'Create Product Details successfully',
                data: result,
            })
        })
        .catch((error) => {
            res.status(500).json({ message: error.message })
        })
}

const getListProduct = (req, res) => {
    productsModel
        .getListProduct(req.query.page_index)
        .then((result) => {
            res.status(200).send({
                status: 'success',
                message: 'Get list product successfully',
                data: result,
            })
        })
        .catch((error) => {
            res.status(500).json({ message: error.message })
        })
}

const getProductByID = (req, res) => {
    productsModel
        .getProductByID(req.params.id)
        .then((result) => {
            res.status(200).send({
                status: 'success',
                message: 'Get product successfully',
                data: result,
            })
        })
        .catch((err) => {
            return res.status(500).json({ message: err.message })
        })
}
const updateProductByID = (req, res) => {
    productsModel
        .updateProductByID(req.params.id, req.body)
        .then((result) => {
            res.status(200).send({
                status: 'success',
                message: 'Update product successfully',
                data: result,
            })
        })
        .catch((err) => {
            return res.status(500).json({ message: err.message })
        })
}

const deleteProductByID = (req, res) => {
    productsModel
        .deleteProductByID(req.params.id)
        .then((result) => {
            res.status(200).send({
                status: 'success',
                message: 'Delete product successfully',
                data: result,
            })
        })
        .catch((err) => {
            return res.status(500).json({ message: err.message })
        })
}

const searchProductBy = (req, res) => {
    productsModel
        .searchProductBy(req.query.searchBy, req.query.keywords)
        .then((data) => {
            res.status(200).send({
                message: 'Search product successfully',
                data: data,
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Search product failed',
                error: error,
            })
        })
}

module.exports = {
    createProductDetail,
    getListProduct,
    getProductByID,
    updateProductByID,
    deleteProductByID,
    searchProductBy,
}