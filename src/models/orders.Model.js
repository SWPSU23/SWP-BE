const pool = require('../services/queryHelper').getPool();
const queries = require('../queries/queryModal');
const Joi = require('joi');
const time = require('../utilities/timeHelper');

const orderSchema = Joi.object({
    employee_id: Joi.number().integer().required(),
    create_at: Joi.string().default(time.getNow),
    product_quantity: Joi.number().integer().default(0),
    total_price: Joi.number().default(0),
    status: Joi.string().default('succeed')
})

const getListOrder = (page_index) => {
    const query = queries.Order.getListOrder(page_index);
    global.logger.info(`Model - Get list order query: ${query}`);

    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                global.logger.error(`Model - Error query getListOrder: ${error}`);
                reject(error);
            } else {
                const data = {
                    info: {},
                    order: []
                }
                results.map((order) => {
                    data.order.push({
                        id: order.id,
                        employee_id: order.employee_id,
                        cashier_name: order.cashier_name,
                        create_at: time.timeStampToDay(order.create_at),
                        total_price: order.total_price,
                        product_quantity: order.product_quantity,
                        status: order.status
                    })
                })
                global.logger.info(`Model - Get list order success: ${data.order}`);
                // add info page
                data.info = {
                    total_page: Math.ceil(results[0].page / 10)
                }
                global.logger.info(`Model - Get info page success: ${data.info}`);
                global.logger.info(`Model - Get data success: ${data}`);
                resolve(data)
            }
        })
    })
}

const createOrder = (data) => {
    const query = queries.Order.createOrder;
    const { error, value } = orderSchema.validate(data);
    if (error) {
        global.logger.error(`Model - Error validate data: ${error}`);
        throw error({ message: error });
    } else {
        return new Promise((resolve, reject) => {
            pool.query(
                query,
                [
                    value.employee_id,
                    value.product_quantity,
                    value.total_price,
                    value.create_at,
                    value.status
                ],
                (error, results) => {
                    if (error) {
                        global.logger.error(`Model - Error query createOrder: ${error}`);
                        reject(error);
                    } else {
                        global.logger.info(`Model - Create order success: ${results}`);
                        resolve(results.insertId);
                    }
                }
            )
        });
    }
}

const deleteOrder = (id) => {
    const query = queries.Order.deleteOrder;
    return new Promise((resolve, reject) => {
        // delete order
        pool.query(query,
            [id],
            (error, results) => {
                if (error) {
                    global.logger.error(`Model - Error query deleteOrder: ${error}`);
                    reject(error);
                } else {
                    global.logger.info(`Model - Delete order success: ${results}`);
                }
            })

        // update stock of product when delete order 
        pool.query(queries.OrderProduct.updateStockProduct,
            [id],
            (error, results) => {
                if (error) {
                    global.logger.error(`Model - Error query updateStockProduct: ${error}`);
                    reject(error);
                } else {
                    // loop through the results to update stock of product
                    results.map((result) => {
                        const newStock = {
                            stock: result.stock + result.quantity
                        }
                        global.logger.info(`Model - Update stock of product: ${newStock} + Id product: ${result.product_id}`);
                        // update stock of product
                        pool.query(queries.Product.updateProductByID,
                            [newStock, result.product_id],
                            (error, results) => {
                                if (error) {
                                    global.logger.error(`Model - Error query updateProductByID: ${error}`);
                                    reject(error);
                                } else {
                                    global.logger.info(`Model - Update stock of product success: ${results} + Id product: ${result.product_id}`);
                                }
                            })
                    })

                    global.logger.info(`Model - Update stock success: ${results}`);
                    resolve();
                }
            })

    })
}

const searchOrderBy = (searchBy, keywords) => {
    const query = queries.Order.searchOrderBy(searchBy, keywords);
    global.logger.info(`Model - Search order query: ${query}`);
    return new Promise((resolve, reject) => {
        pool.query(query,
            (error, results) => {
                if (error) {
                    global.logger.error(`Model - Error query searchOrderBy: ${error}`);
                    reject(error);
                } else {
                    global.logger.info(`Model - Search order success: ${results}`);
                    resolve(results);
                }
            })
    })
}

module.exports = {
    createOrder,
    getListOrder,
    deleteOrder,
    searchOrderBy
};
