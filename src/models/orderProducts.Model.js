const Joi = require('joi');
const queries = require('../queries/queryModal');
const pool = require('../services/queryHelper').getPool();

const orderProductSchema = Joi.object({
    order_id: Joi.number().integer().required(),
    product_id: Joi.number().integer().required(),
    quantity: Joi.number().integer().required(),
    unit_price: Joi.number().required(),
    total: Joi.number().required()
})

const createListOrderProduct = (order_id, validData, orderUpdate) => {
    const query = queries.OrderProduct.createListOrderProduct;
    // add order_id to data_products
    const listProduct = validData.map((data) => ({
        order_id: order_id,
        product_id: data.product_id,
        quantity: data.quantity,
        unit_price: data.unit_price,
        total: data.total
    }));
    // add product_id, stock to update stock for product
    const listProductUpdate = validData.map((data) => ({
        product_id: data.product_id,
        stock: data.newQuantity
    }))
    // validate data
    const { error, value } = Joi.array().items(orderProductSchema).validate(listProduct);
    if (error) {
        global.logger.error(error);
        throw error;
    } else {
        // convert data to array
        global.logger.info("value", value)
        const values = value.map((value) =>
            [
                order_id,
                value.product_id,
                value.quantity,
                value.unit_price,
                value.total
            ]
        );
        // query to update
        return new Promise((resolve, reject) => {
            // insert list order product
            pool.query(query, [values], (error, results) => {
                if (error) {
                    reject(error.message);
                } else {
                    global.logger.info(results.message);
                }
            })
            // update stock for product
            listProductUpdate.map((data) => {
                pool.query(
                    queries.Product.updateProductByID,
                    [{ stock: data.stock }, data.product_id],
                    (error, results) => {
                        if (error) {
                            reject(error.message);
                        } else {
                            global.logger.info(results.message);
                        }
                    })
            })
            // update total_price, product_quantity for order
            pool.query(queries.Order.updateOrder,
                [orderUpdate, order_id],
                (error, results) => {
                    if (error) {
                        reject(error.message);
                    } else {
                        global.logger.info("Update total_price for order", results);
                        resolve("Create list order products successfully");
                    }
                })
        })
    }
}

const getListDetailOrder = (order_id) => {
    const query = queries.OrderProduct.getListDetailOrder;

    return new Promise((resolve, reject) => {
        pool.query(query, [order_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                const data = {
                    order: {},
                    orderProduct: []
                }
                data.orderProduct = results.map((result) => ({
                    id: result.id,
                    name: result.name,
                    unit: result.unit,
                    unit_price: result.unit_price,
                    quanitity: result.quantity,
                    total: result.total
                }))
                data.order = {
                    order_id: results[0].order_id,
                    employee_id: results[0].employee_id,
                    employee_name: results[0].employee_name,
                    total_price: results[0].total_price,
                }
                resolve(data);
            }
        })
    })
}

const deleteOrderProduct = (id) => {
    const query = queries.OrderProduct.deleteOrderProduct;
    return new Promise((resolve, reject) => {
        // delete order detail
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

const updateOrderProduct = (data) => {
    return new Promise((resolve, reject) => {

        data.orderProduct.map((orderDetail) => {
            pool.query(queries.OrderProduct.updateOrderProduct, [orderDetail, orderDetail.id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    global.logger.info("Update order detail successfully", results);
                }
            })
        })

        pool.query(queries.Order.updateOrder, [data.order, data.order.order_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                global.logger.info("Update order successfully", results);
                resolve("Update order successfully");
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


