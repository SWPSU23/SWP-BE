const pool = require('../services/query.Service');
const queries = require('../queries/queryModal');

const validateCreateOrder = async (products, employee_id) => {
    try {
        // check quantity of product
        const data = {
            products: [],
            order: {}
        };
        // set quantity_product and total_price
        data.order.product_quantity = 0;
        data.order.total_price = 0;
        // set employee_id
        data.order.employee_id = employee_id;
        // validate product
        products.map(async (product) => {
            const product_detail = await pool
                .getData(
                    queries.Product.getProductByID,
                    [product.product_id]
                );
            // check if product is exist
            if (product_detail[0].stock < product.quantity) {
                throw new Error(`ValidationError: Product ${product.product_id} don't have enough quantity`);
            }
            // push valid data
            data.products.push({
                product_id: product.product_id,
                quantity: product.quantity,
                unit_price: product_detail[0].retail_price,
                total: product.quantity * product_detail[0].retail_price,
                new_stock: product_detail[0].stock - product.quantity
            })
            // set quantity_product and total_price
            data.order.product_quantity += product.quantity;
            data.order.total_price += product.quantity * product_detail[0].retail_price;
        })
        // return valid data
        return data;
    } catch (error) {
        global.logger.error(`Validator: Error validateCreateOrder: ${error}`);
        throw error;
    }
}

module.exports = {
    validateCreateOrder
}