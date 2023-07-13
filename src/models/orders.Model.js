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
    global.logger.info(query);
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                global.logger.error(error);
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
                global.logger.info("Order detail", data.order)
                // add info page
                data.info = {
                    total_page: Math.ceil(results[0].page / 10)
                }
                global.logger.info("page", data.info.page)
                resolve(data)
            }
        })
    })
}

const createOrder = (data) => {
    const query = queries.Order.createOrder;
    const { error, value } = orderSchema.validate(data);
    if (error) {
        global.logger.error(error);
        new Promise.reject(error);
    } else {
        global.logger.info(value);
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
                        console.error('Error executing the query: ', error);
                        reject(error);
                    } else {
                        global.logger.info('Got the results from the database: ', results);
                        resolve(results.insertId);
                    }
                }
            )
        });
    }
}

const deleteOrder = (id) => {
    const query = queries.Order.deleteOrder;
    console.log("query: ", query)
    console.log("id: ", id)
    return new Promise((resolve, reject) => {
        pool.query(query, [id], (err, results) => {
            if (err) {
                global.logger.error(err);
                reject(err);
            } else {
                global.logger.info(results);
            }
        })

        // update stock of product when delete order 
        pool.query(queries.OrderProduct.updateStockProduct, [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                global.logger.info(results);
                // loop through the results to update stock of product
                results.map((result) => {
                    const newStock = {
                        stock: result.stock + result.quantity
                    }
                    // update stock of product
                    pool.query(queries.Product.updateProductByID, [newStock, result.product_id], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            global.logger.info(results);
                        }
                    })
                })
                resolve()

            }
        })

    })
}

const searchOrderBy = (searchBy, keywords) => {
    const query = queries.Order.searchOrderBy(searchBy, keywords);
    global.logger.info(query);
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                global.logger.error(error.message);
                reject(error);
            } else {
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
