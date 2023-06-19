const ordersModel = require('../models/ordersModel');

const getListOrder = (req, res) => {
    ordersModel.getListOrder()
        .then((data) => {
            res.status(200).send({
                message: 'Get list order successfully',
                data: data
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Error while getting list order',
                error: error.message
            })
        })
}

const createOrder = (req, res) => {
    ordersModel.createOrder(req.body)
        .then((data) => {
            res.status(200).send({
                message: 'Order created successfully',
                order_id: data
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Error creating order',
                error: error.message
            })
        })
}

module.exports = {
    createOrder,
    getListOrder
}