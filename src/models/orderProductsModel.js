const Joi = require('joi');
const queries = require('../queries/queryModal');
const pool = require('../services/queryHelper').getPool();

const orderProductSchema = Joi.object({
    order_id: Joi.number().integer().required(),
    product_id: Joi.number().integer().required(),
    quantity: Joi.number().integer().required(),
    price: Joi.number().required()
})

const createListOrderProduct = (order_id, validData, total_price) => {
    const query = queries.OrderProduct.createListOrderProduct;
    global.logger.info("validData", validData)
    // add order_id to data_products
    const listProduct = validData.map((data) => ({
        order_id: order_id,
        product_id: data.product_id,
        quantity: data.quantity,
        price: data.price,
    }));
    // validate data
    const { error, value } = Joi.array().items(orderProductSchema).validate(listProduct);
    if (error) {
        global.logger.error(error);
        throw error;
    } else {
        // convert data to array
        const values = value.map((value) =>
            [
                order_id,
                value.product_id,
                value.quantity,
                value.price
            ]
        )
        // set total_price for order
        const price = {
            total_price: total_price
        }

        return new Promise((resolve, reject) => {
            // update stock for product
            validData.map((data) => {
                pool.query(
                    queries.Product.updateProductByID, [{
                        stock: data.quantity
                    }, data.product_id], (error, results) => {
                        if (error) {
                            reject(new Error("Update stock for product failed"));
                        } else {
                            global.logger.info("Update stock for product successfully", results);
                        }
                    })
            })
            // update total_price for order
            pool.query(
                queries.Order.updateOrder, [price, order_id], (error, results) => {
                    if (error) {
                        reject(new Error("Update total_price for order failed"));
                    } else {
                        global.logger.info("Update total_price for order", results);
                    }
                })
            // insert list order product
            pool.query(
                query, [values], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        global.logger.info("Insert list order product successfully");
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


