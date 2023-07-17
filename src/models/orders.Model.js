const pool = require('../services/query.Service');
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

const getListOrder = async (page_index) => {
    try {
        const results = await pool
            .getData(
                queries.Order.getListOrder(page_index),
                []
            );
        const data = {
            info: {},
            order: []
        }
        results.map(
            (result) => {
                data.order.push({
                    order_id: result.order_id,
                    employee_id: result.employee_id,
                    product_quantity: result.product_quantity,
                    total_price: result.total_price,
                    create_at: time.timeStampToDay(result.create_at),
                    status: result.status
                })
            })
        data.info.total_page = Math.ceil(results[0].page / 10);
        return data;
    } catch (error) {
        global.logger.error(`Model - Error query getListOrder: ${error}, query: ${queries.Order.getListOrder(page_index)}`);
        throw error;
    }
}

const createOrder = async (data) => {
    try {
        const { error, value } = orderSchema.validate(data);
        if (error) {
            global.logger.error(`Model - Error validate createOrder: ${error}, value: ${data}`);
            throw error;
        } else {
            const result = await pool
                .setData(
                    queries.Order.createOrder,
                    [
                        value.employee_id,
                        value.create_at,
                        value.product_quantity,
                        value.total_price,
                        value.status
                    ]
                );
            global.logger.info(`Model - Create order success id: ${JSON.stringify(result)}`);
            return result;
        }
    } catch (error) {
        global.logger.error(`Model - Error createOrder: ${error} + query: ${queries.Order.createOrder} + data: ${data}`);
        throw error;
    }
}

const deleteOrder = async (id) => {
    try {
        const results = await pool
            .setData(
                queries.Order.deleteOrder,
                [id]
            );
        // update stock product
        const listOrderDetail = await pool
            .getData(
                queries.OrderProduct.getListDetailOrder,
                [id]
            );
        // a loop for get product_id and quantity
        listOrderDetail.map(
            async (orderDetail) => {
                const quantity = orderDetail.quantity;
                const product_id = orderDetail.product_id;
                const productDetail = await pool
                    .getData(
                        queries.Product.getProductById,
                        [product_id]
                    );
                // new stock = old stock + quantity
                const stockUpdate = productDetail.stock + quantity;
                await pool.setData(
                    queries.Product.updateProductByID,
                    [
                        { stock: stockUpdate },
                        product_id]
                );
            });
        return results;

    } catch (error) {
        global.logger.error(`Model - Error query deleteOrder: ${error}, query: ${queries.Order.deleteOrder}, id: ${id}`);
        throw error;
    }
}

const searchOrderBy = async (searchBy, keywords) => {
    try {
        const results = await pool
            .getData(
                queries.Order.searchOrderBy(searchBy, keywords),
                []
            );
        const data = results.map((result) => (
            {
                order_id: result.order_id,
                employee_id: result.employee_id,
                product_quantity: result.product_quantity,
                total_price: result.total_price,
                create_at: time.timeStampToDay(result.create_at),
                status: result.status
            }
        ));
        return data;
    } catch (error) {
        global.logger.error(`Model - Error query searchOrderBy: ${error}, query: ${queries.Order.searchOrderBy(searchBy, keywords)}`);
        throw error;
    }
}

module.exports = {
    createOrder,
    getListOrder,
    deleteOrder,
    searchOrderBy
};
