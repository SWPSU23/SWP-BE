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
                        sucess: true,
                        data: results
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        success: false,
                        message: error.message
                    });
                }))
        .catch((error) => {
            res.status(500).send({
                success: false,
                message: error.message
            });
        })
}

const getListDetailOrder = (req, res) => {
    orderProductModel.getListDetailOrder(req.query.order_id)
        .then((results) => {
            res.status(200).send({
                success: true,
                data: results
            });
        })
        .catch((error) => {
            res.status(500).send({
                success: false,
                message: error.message
            });
        })
}

module.exports = {
    createListOrderProduct,
    getListDetailOrder
}