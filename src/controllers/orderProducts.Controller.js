const orderProductModel = require('../models/orderProducts.Model');
const orderProductValidation = require('../validations/orderProducts.Validation');

const createListOrderProduct = (req, res) => {
    orderProductValidation
        .checkQuantityProduct(req.body.products)
        .then((validData) =>
            orderProductModel.
                createListOrderProduct(req.body.order_id, validData, req.body.order)
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
                }))
        .catch((error) => {
            res.status(500).send({
                success: false,
                message: "Create list order products failed",
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