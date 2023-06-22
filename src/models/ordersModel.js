const pool = require('../services/queryHelper').getPool();
const queries = require('../queries/queryModal');
const Joi = require('joi');
const time = require('../utilities/timeHelper');

const orderSchema = Joi.object({
    employee_id: Joi.number().integer().required(),
    create_at: Joi.string().default(time.getNow),
    status: Joi.string().default('succeed')
})

const getListOrder = () => {
    const query = queries.Order.getListOrder;
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
}

const createOrder = (data) => {
    const query = queries.Order.createOrder;
    global.logger.info(data);
    const { error, value } = orderSchema.validate(data);
    global.logger.info(value);
    if (error) {
        global.logger.error(error);
        throw error;
    } else {
        console.log("status", value);
        return new Promise((resolve, reject) => {
            pool.query(
                query,
                [
                    value.employee_id,
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
