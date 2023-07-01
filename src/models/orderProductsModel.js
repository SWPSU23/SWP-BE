const Joi = require('joi');
const queries = require('../queries/queryModal');
const pool = require('../services/queryHelper').getPool();

const orderProductSchema = Joi.object({
    order_id: Joi.number().integer().required(),
    product_id: Joi.number().integer().required(),
    quantity: Joi.number().integer().required(),
    price: Joi.number().required()
})

const createListOrderProduct = (order_id, data_products, total_price) => {
    const query = queries.OrderProduct.createListOrderProduct;
    // add order_id to data_products
    const listProduct = data_products.map((data) => ({
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
            // update total_price for order
            pool.query(
                queries.Order.updateOrder, [price, order_id], (error, results) => {
                    if (error) {
                        reject(new Error("Update total_price for order failed"));
                    } else {
                        global.logger.info("Update total_price for order", results);
                    }
                })
            // update quantity for product
            value.forEach((product_item) => {
                pool.query(queries.Product.getProductByID, [product_item.product_id], (error, results) => {
                    if (error) {
                        reject(new Error("Get product failed"));
                    } else {
                        // set new quantity for product
                        const quantity = results[0].stock - product_item.quantity;
                        // check quantity of product in stock
                        if (quantity < 0) {
                            reject(new Error("Out of stock"));
                        }
                        // update quantity for product
                        pool.query(queries.Product.updateProductByID, [
                            { stock: quantity }, product_item.product_id],
                            (error, results) => {
                                if (error) {
                                    reject(new Error("Update quantity for product failed"));
                                } else {
                                    global.logger.info("Update quantity for product", results);
                                }
                            })
                    }
                })
            })
            // insert list order product
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


