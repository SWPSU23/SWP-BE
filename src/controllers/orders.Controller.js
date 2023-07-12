const ordersModel = require('../models/orders.Model');

const getListOrder = (req, res) => {
    ordersModel.getListOrder(req.query.page_index)
        .then((data) => {
            res.status(200).send({
                success: true,
                data: data
            })
        })
        .catch((error) => {
            res.status(500).send({
                success: false,
                message: error.message
            })
        })
}

const createOrder = (req, res) => {
    ordersModel.createOrder(req.body)
        .then((data) => {
            res.status(200).send({
                success: true,
                order_id: data
            })
        })
        .catch((error) => {
            res.status(500).send({
                success: false,
                message: error.message
            })
        })
}

const deleteOrder = (req, res) => {
    console.log(req.params.id)
    ordersModel.deleteOrder(req.params.id)
        .then((results) => {
            res.status(200).send({
                success: true,
                data: results
            });
        })
        .catch((errors) => {
            res.status(500).send({
                success: false,
                message: errors.message
            });
        })
}

const searchOrder = (req, res) => {
    ordersModel.searchOrderBy(req.query.searchBy, req.query.keywords)
        .then((results) => {
            res.status(200).send({
                success: true,
                data: results
            })
        })
        .catch((errors) => {
            res.status(500).send({
                success: false,
                message: errors.message
            })
        })
}

module.exports = {
    createOrder,
    getListOrder,
    deleteOrder,
    searchOrder
}