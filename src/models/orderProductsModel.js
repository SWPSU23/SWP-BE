const Joi = require('joi');
const queries = require('../queries/queryModal');
const pool = require('../services/queryHelper').getPool();

const orderProductSchema = Joi.object({
    order_id: Joi.number().integer().required(),
    product_id: Joi.number().integer().required(),
    quantity: Joi.number().integer().required(),
    price: Joi.number().required()
})

const createListOrderProduct = (data) => {
    const query = queries.OrderProduct.createListOrderProduct;
    const { error, value } = Joi.array().items(orderProductSchema).validate(data);

    if (error) {
        global.logger.error(error);
        throw error;
    } else {
        const values = value.map((value) =>
            [
                value.order_id,
                value.product_id,
                value.quantity,
                value.price
            ]
        )
        return new Promise((resolve, reject) => {
            pool.query(
                query, [values], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                })
        })
    }
}

const getListDetailOrder = (order_id) => {
    const query = queries.OrderProduct.getListDetailOrder;
    return new Promise((resolve, reject) => {
        pool.query(
            query, [order_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            })
    })
}

const deleteOrderProduct = (id) => {
    const query = queries.OrderProduct.deleteOrderProduct;
    return new Promise((resolve, reject) => {
        pool.query(
            query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            })
    })
}

const updateOrderProduct = (data, id) => {
    const query = queries.OrderProduct.updateOrderProduct;
    return new Promise((resolve, reject) => {
        pool.query(
            query, [data, id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            })
    })
}


module.exports = {
    createListOrderProduct,
    getListDetailOrder,
    deleteOrderProduct,
    updateOrderProduct
}


