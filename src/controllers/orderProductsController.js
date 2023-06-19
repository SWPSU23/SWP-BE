const orderProductModel = require('../models/orderProductsModel');

const createListOrderProduct = (req, res) => {
    console.log("body", req.body);
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

module.exports = {
    createListOrderProduct
}
