const orderProductModel = require('../models/orderProductsModel');

const createListOrderProduct = (req, res) => {
    orderProductModel
        .createListOrderProduct(req.body)
        .then((result) => {
            res.status(200).send({
                message: 'List Order Products created successfully',
                data: result
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'List Order Products created failed',
                error: error.message
            })
        })
}

const getListOrderProduct = (req, res) => {
    orderProductModel
        .getListOrderProduct(req.params.id)
        .then((result) => {
            res.status(200).send({
                message: 'Get list order products successfully',
                data: result
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'List Order Products created failed',
                error: error.message
            })
        })
}

const deleteOrderProduct = (req, res) => {
    orderProductModel.deleteOrderProduct(req.query.product_id, req.query.order_id)
        .then((results) => {
            res.status(500).send({
                message: 'Delete orderProduct success',
                data: results
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Delete orderProduct failed',
                error: error.message
            })
        })
}

const updateOrderProduct = (req, res) => {
    orderProductModel.updateOrderProduct(req.data, req.query.product_id, req.query.order_id)
        .then((results) => {
            res.status(500).send({
                message: 'Update orderProduct success',
                data: results
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Update orderProduct failed',
                error: error.message
            })
        })
}

module.exports = {
    createListOrderProduct,
    getListOrderProduct,
    deleteOrderProduct,
    updateOrderProduct
}
