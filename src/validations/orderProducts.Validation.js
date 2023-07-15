const pool = require('../services/queryHelper').getPool()
const queries = require('../queries/queryModal')

const checkQuantityProduct = (products) => {
    return new Promise((resolve, reject) => {
        const pormise = products.map(
            (product) =>
                // get quantity of product in stock, handle from list order product is inserted
                new Promise((resolve, reject) => {
                    pool.query(
                        queries.Product.getProductByID,
                        [product.product_id],
                        (error, results) => {
                            if (error) {
                                global.logger.error(error);
                                reject(error);
                            } else {
                                const checkQuantityProduct = results[0].stock - product.quantity;
                                global.logger.info("New quantity of product in stock", checkQuantityProduct);
                                // check quantity of product in stock
                                if (checkQuantityProduct < 0) {
                                    global.logger.error(`Quantity of product is not enough ${product.product_id} just have ${results[0].stock}`);
                                    reject({ message: "Quantity of product is not enough" });
                                } else {
                                    // update valid quantity of product
                                    const validData = {
                                        product_id: product.product_id,
                                        quantity: product.quantity,
                                        unit_price: product.unit_price,
                                        total: product.total,
                                        newQuantity: checkQuantityProduct,
                                    };
                                    global.logger.info("Valid orderProduct", validData);
                                    resolve(validData);
                                }
                            }
                        }
                    )
                })
        )
        // handle multiple promise with Promise.all to get list quantity of product
        Promise.all(pormise)
            .then((results) => {
                // return list valid of product to insert list order product
                global.logger.info("List valid orderProduct", results);
                resolve(results);
            })
            .catch((error) => {
                reject(error);
            })
    })
}
module.exports = {
    checkQuantityProduct,
}
