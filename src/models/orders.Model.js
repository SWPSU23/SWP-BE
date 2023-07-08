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
                global.logger.error(error.message);
                reject(error);
            } else {
                resolve(results);
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
    return new Promise((resolve, reject) => {
        pool.query(query, [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

const updateOrder = (id, data) => {
    const query = queries.Order.updateOrder;
    return new Promise((resolve, reject) => {
        pool.query(query, [data, id], (error, results) => {
            if (error) {
                global.logger.error(error.message);
                reject(error);
            } else {
                resolve(results);
            }
        })
    });
}

module.exports = {
    createOrder,
    getListOrder,
    deleteOrder,
    updateOrder
};
