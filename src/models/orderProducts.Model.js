const queries = require('../queries/queryModal');
const pool = require('../services/query.Service');

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
    getListDetailOrder
}


