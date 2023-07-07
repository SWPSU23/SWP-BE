const ordersModel = require('../models/orders.Model');

const getListOrder = (req, res) => {
    ordersModel.getListOrder(req.query.page_index)
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

const deleteOrder = (res, req) => {
    ordersModel.deleteOrder(req.params.id)
        .then((results) => {
            res.status(200).send({
                message: 'Delete order successfully',
                data: results
            });
        })
        .catch((errors) => {
            res.status(500).send({
                message: 'Error deleting order',
                errors: errors.message
            });
        })
}

const updateOrder = (req, res) => {
    ordersModel.updateOrder(req.params.id, req.body)
        .then((results) => {
            res.status(200).send({
                message: 'Update Order successfully',
                data: results
            })
        })
        .catch((errors) => {
            res.status(500).send({
                message: 'Update Order failed',
                errors: errors.message
            })
        })
}

const searchOrder = (req, res) => {
    ordersModel.searchOrder(req.query.searchBy, req.query.keywords)
        .then((results) => {
            res.status(200).send({
                message: 'Search order succed',
                data: results
            })
        })
        .catch((errors) => {
            res.status(500).send({
                message: 'Search order failed',
                errors: errors.message
            })
        })
}

module.exports = {
    createOrder,
    getListOrder,
    deleteOrder,
    updateOrder,
    searchOrder
}