const pool = require('../services/queryHelper').getPool();
const queries = require('../queries/queryModal');
const Joi = require('joi');
const time = require('../utilities/timeHelper');

const orderSchema = Joi.object({
    employee_id: Joi.number().integer().required(),
    create_at: Joi.string().default(time.getNow)
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
    console.log(query);
    const { error, value } = orderSchema.validate(data);
    console.log(value);
    if (error) {
        console.log("Error validating order", error);
        throw error;
    } else {
        return new Promise((resolve, reject) => {
            pool.query(
                query,
                [
                    value.employee_id,
                    value.create_at
                ],
                (error, results) => {
                    if (error) {
                        console.error('Error executing the query: ', error)
                        reject(error);
                    } else {
                        console.log(
                            'Got the results from the database: ',
                            results
                        );
                        resolve(results.insertId);
                    }
                }
            )
        });
    }
}

module.exports = {
    createOrder,
    getListOrder
};
