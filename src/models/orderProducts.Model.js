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
    global.logger.info(`Model - Add order_id to data_products: ${listProduct}`)
    // add product_id, stock to update stock for product
    const listProductUpdate = validData.map((data) => ({
        product_id: data.product_id,
        stock: data.newQuantity
    }))
    global.logger.info(`Model - Add product_id, stock to update stock for product: ${listProductUpdate}`)
    // validate data
    const { error, value } = Joi.array().items(orderProductSchema).validate(listProduct);
    if (error) {
        global.logger.error(`Model - Error validate data: ${error}`);
        throw error({ message: error });
    } else {
        // convert data to array
        const values = value.map((value) =>
            [
                order_id,
                value.product_id,
                value.quantity,
                value.unit_price,
                value.total
            ]
        );
        global.logger.info(`Model - Convert data to array: ${values}`)
        // query to update
        return new Promise((resolve, reject) => {
            // insert list order product
            pool.query(query,
                [values],
                (error, results) => {
                    if (error) {
                        global.logger.error(`Model - Error query createListOrderProduct: ${error}`);
                        reject(error);
                    } else {
                        global.logger.info(`Model - Create list order product success: ${results}`);
                    }
                })
            // update stock for product
            listProductUpdate.map((data) => {
                if (data.stock > 0) {
                    pool.query(
                        queries.Product.updateProductByID,
                        [
                            { stock: data.stock },
                            data.product_id
                        ],
                        (error, results) => {
                            if (error) {
                                global.logger.error(`Model - Error query update stock for product: ${error}`);
                                reject(error);
                            } else {
                                global.logger.info(`Model - Update stock for product success: ${results}`);
                            }
                        })
                } else {
                    pool.query(
                        queries.Product.updateProductByID,
                        [
                            {
                                stock: data.stock,
                                status: 'unavailable'
                            },
                            data.product_id
                        ],
                        (error, results) => {
                            if (error) {
                                global.logger.error(`Model - Error query update stock for product: ${error}`);
                                reject(error);
                            } else {
                                global.logger.info(`Model - Update stock for product success: ${results}`);
                            }
                        })
                }
            })
            // update total_price, product_quantity for order
            pool.query(queries.Order.updateOrder,
                [orderUpdate, order_id],
                (error, results) => {
                    if (error) {
                        global.logger.error(`Model - Error query update total_price, product_quantity for order: ${error}`);
                        reject(error);
                    } else {
                        global.logger.info(`Model - Update total_price, product_quantity for order success: ${results}`);
                    }
                })

            resolve("Create list order product success");
        })
    }
}

const getListDetailOrder = (order_id) => {
    const query = queries.OrderProduct.getListDetailOrder;

    return new Promise((resolve, reject) => {
        pool.query(query, [order_id], (error, results) => {
            if (error) {
                global.logger.error(`Model - Error query getListDetailOrder: ${error}`);
                reject(error);
            } else {
                const data = {
                    order: {},
                    orderProduct: []
                }
                // Order product detail
                data.orderProduct = results.map((result) => ({
                    id: result.id,
                    name: result.name,
                    unit: result.unit,
                    unit_price: result.unit_price,
                    quantity: result.quantity,
                    total: result.total
                }))
                global.logger.info(`Model - Get list detail order product success: ${data.orderProduct}`);
                // Order detail
                data.order = {
                    order_id: results[0].order_id,
                    employee_id: results[0].employee_id,
                    employee_name: results[0].employee_name,
                    total_price: results[0].total_price,
                }
                global.logger.info(`Model - Get order detail success: ${data.order}`);
                global.logger.info(`Model - Get list detail order success: ${data}`);
                resolve(data);
            }
        })
    })
}

module.exports = {
    createListOrderProduct,
    getListDetailOrder
}


