const ordersModel = require('../models/orders.Model');
const orderValidator = require('../validators/orders.Validator');

const getListOrder = async (req, res) => {
    try {
        const data = await ordersModel.getListOrder(req.query.page_index);
        res.status(200).send({
            success: true,
            data: data
        })
    } catch (error) {
        if (error.message.includes('ValidationError')) {
            res.status(400).send({
                success: false,
                message: error.message
            })
        } else {
            res.status(500).send({
                success: false,
                message: error.message
            })
        }

    }
}

const createOrder = async (req, res) => {
    try {
        const data = await ordersModel.createOrder(
            await orderValidator
                .validateCreateOrder(
                    req.body.products,
                    req.body.employee_id
                ));
        // 201 meaning resource successfully created
        res.status(201)
            .send({
                success: true,
                order_id: data.insertId
            })
    } catch (error) {
        if (error.message.includes('ValidationError')) {
            res.status(400).send({
                success: false,
                message: error.message
            })
        } else {
            res.status(500).send({
                success: false,
                message: error.message
            })
        }
    }
}

const deleteOrder = (req, res) => {
    try {
        const data = ordersModel.deleteOrder(req.params.id);
        res.status(200).send({
            success: true,
            data: data
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const searchOrder = (req, res) => {
    try {
        const data = ordersModel.searchOrder(req.query.searchBy, req.query.keywords);
        res.status(200).send({
            success: true,
            data: data
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createOrder,
    getListOrder,
    deleteOrder,
    searchOrder
}