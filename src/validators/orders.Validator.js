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
        for (let i = 0; i < products.length; i++) {
            const product_detail = await pool
                .getData(
                    queries.Product.getProductByID,
                    [products[i].product_id]
                );
            // check if product is exist
            if (product_detail[0].stock < products[i].quantity) {
                throw new Error(`ValidationError: Product ${products[i].product_id} don't have enough quantity`);
            }
            // check if product is unavailable
            if (product_detail[0].status === "unavailable") {
                throw new Error(`ValidationError: Product ${products[i].product_id} is unavailable`);
            }
            // push valid data
            data.products.push({
                product_id: products[i].product_id,
                quantity: products[i].quantity,
                unit_price: product_detail[0].retail_price,
                total: products[i].quantity * product_detail[0].retail_price,
                new_stock: product_detail[0].stock - products[i].quantity
            })
            // set quantity_product and total_price
            data.order.product_quantity += products[i].quantity;
            data.order.total_price += products[i].quantity * product_detail[0].retail_price;
        }
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