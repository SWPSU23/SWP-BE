const pool = require('../services/query.Service');
const queries = require('../queries/queryModal');

const validateCheckQuantityProduct = async (products) => {
    try {
        const valid_products = [];
        products.map(async (product) => {
            const product_detail = pool
                .getData(
                    queries.Product.getProductByID,
                    [product.product_id]
                );
            if (product_detail.stock < product.quantity) {
                throw new Error(`Product ${product.product_id} is out of stock`);
            } else {
                valid_products.push({
                    product_id: product.product_id,
                    quantity: product.quantity,
                    unit_price: product.unit_price,
                    total: product.total,
                    new_stock: product_detail.stock - product.quantity
                });
            }
        })
        return valid_products;
    } catch (error) {
        global.logger.error(`Validation - Error check quantity product: ${error}`);
        throw new Error(error.message);
    }
}
module.exports = {
    validateCheckQuantityProduct
}
