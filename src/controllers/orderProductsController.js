const orderProductModel = require('../models/orderProductsModel');

const createListOrderProduct = (req, res) => {
    orderProductModel.createListOrderProduct(req.body.order_id, req.body.products, req.body.total_price)
        .then((results) => {
            res.status(200).send({
                message: 'Create list order products successfully',
                data: results
            });
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Create list order products failed',
                error: error.message
            });
        })
}

const getListDetailOrder = (req, res) => {
    orderProductModel.getListDetailOrder(req.query.order_id)
        .then((results) => {
            res.status(200).send({
                message: 'Get list order products successfully',
                data: results
            });
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Get list order products failed',
                error: error.message
            });
        })
}

const deleteOrderProduct = (req, res) => {
    orderProductModel.deleteOrderProduct(req.params.id)
        .then((results) => {
            res.status(200).send({
                message: 'Delete order product successfully',
                data: results
            });
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Delete order product failed',
                error: error.message
            });
        })
}

const updateOrderProduct = (req, res) => {
    orderProductModel.updateOrderProduct(req.body, req.params.id)
        .then((results) => {
            res.status(200).send({
                message: 'Update order product successfully',
                data: results
            });
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Update order product failed',
                error: error.message
            });
        })
}

module.exports = {
    createListOrderProduct,
    getListDetailOrder,
    deleteOrderProduct,
    updateOrderProduct
}