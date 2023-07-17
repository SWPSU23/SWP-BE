const orderProductModel = require('../models/orderProducts.Model');
const orderProductValidator = require('../validators/orderProducts.Validator');

const createListOrderProduct = async (req, res) => {
    try {
        const results = await orderProductModel
            .createListOrderProduct(
                req.params.order_id,
                await orderProductValidator.
                    validateCheckQuantityProduct(
                        req.body.products
                    ),
                req.body.order);
        res.status(200).send({
            success: true,
            data: results
        })
    } catch (error) {
        if (error.message.includes('out of stock')) {
            res.status(400).send({
                success: false,
                message: error.message
            })
        }
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const getListDetailOrder = async (req, res) => {
    try {
        console.log(req.params.order_id)
        const data = await orderProductModel.getListDetailOrder(req.params.order_id);
        res
            .status(200)
            .send({
                success: true,
                data: data
            })
    } catch (error) {
        res
            .status(500)
            .send({
                success: false,
                message: error.message
            })
    }
}

module.exports = {
    createListOrderProduct,
    getListDetailOrder
}