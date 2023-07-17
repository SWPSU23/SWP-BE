const Joi = require('joi');
const queries = require('../queries/queryModal');
const pool = require('../services/query.Service');

const orderProductSchema = Joi.object({
    order_id: Joi.number().integer().required(),
    product_id: Joi.number().integer().required(),
    quantity: Joi.number().integer().required(),
    unit_price: Joi.number().required(),
    total: Joi.number().required()
})

const createListOrderProduct = async (order_id, valid_products, orderUpdate) => {
    try {
        // add order_id to products for create
        const products = valid_products.map((product) => ({
            order_id: order_id,
            product_id: product.product_id,
            quantity: product.quantity,
            unit_price: product.unit_price,
            total: product.total
        }))
        const { error, value } = Joi.validate(products, Joi.array().items(orderProductSchema));
        if (error) {
            global.logger.error(`Model - Error validate create list order product: ${error}`);
            throw new Error(error.message);
        } else {
            // convert value to array
            const values = value.map((product) => {
                [
                    product.order_id,
                    product.product_id,
                    product.quantity,
                    product.unit_price,
                    product.total
                ]
            });
            // create list order product
            const results_order_product = await pool
                .setData(queries.OrderProduct.createListOrderProduct, [values]
                );
            // update order
            await pool
                .setData(
                    queries.Order.updateOrder,
                    [orderUpdate, order_id]
                );
            // update stock product
            valid_products.map(async (product) => {
                await pool
                    .setData(
                        queries.Product.updateStockProduct,
                        [{ stock: product.new_stock }, product.product_id]
                    );
            })
            global.logger.info(`Model - Create list order product success: ${results_order_product}`);
            return results_order_product;
        }
    } catch (error) {
        global.logger.error(`Model - Error create list order product: ${error}`);
        throw new Error(error.message);
    }
}

const getListDetailOrder = async (order_id) => {
    try {
        const results = await pool
            .getData(
                queries.OrderProduct.getListDetailOrder,
                [order_id]
            );
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
        return data;
    } catch (error) {
        global.logger.error(`Model - Error query get list detail order product: ${error} query: ${queries.OrderProduct.getListDetailOrder} id: ${order_id}`);
        throw error;
    }
}

module.exports = {
    createListOrderProduct,
    getListDetailOrder
}


