const pool = require('../services/query.Service');
const queries = require('../queries/queryModal')
const time = require('../utilities/timeHelper')
const Joi = require('joi')

const productSchema = Joi.object({
    name: Joi.string().min(5).max(32).required(),
    description: Joi.string().required().min(5).max(102),
    unit: Joi.string().required().min(1).max(32),
    cost_price: Joi.number().required().min(100),
    stock: Joi.number().integer().required().min(1),
    retail_price: Joi.number().required().min(100),
    category: Joi.string().required(),
    status: Joi.string().default('available'),
    image: Joi.string().min(32).max(32).required(),
    create_at: Joi.string().default(time.getNow),
    expired_at: Joi.string().required(),
})

const createProductDetails = async (product) => {
    const { error, value } = productSchema.validate(product)
    if (error) {
        global.logger.error(`Model - Error validate product: ${error}`)
        throw error;
    } else {
        try {
            const results = await pool.setData(queries.Product.createProductDetail, [
                value.name,
                value.description,
                value.unit,
                value.cost_price,
                value.stock,
                value.retail_price,
                value.category,
                value.status,
                value.image,
                value.create_at,
                value.expired_at,
            ]);
            global.logger.info(`Model - Create product success: ${JSON.stringify(results)}`)
            return results;
        } catch (error) {
            global.logger.error(`Model - Error query createProductDetails: ${error}`)
            throw error;
        }
    }

}

const getListProduct = async (page_index) => {
    try {
        const results = await pool
            .getData(
                queries.Product.getListProduct(page_index),
                []
            );
        const data = {
            info: {},
            product: []
        };
        results.map((item) => {
            data.product.push({
                id: item.id,
                name: item.name,
                description: item.description,
                unit: item.unit,
                cost_price: item.cost_price,
                stock: item.stock,
                retail_price: item.retail_price,
                category: item.category,
                image: item.image,
                create_at: time.timeStampToDay(item.create_at),
                expired_at: time.timeStampToDay(item.expired_at),
                status: item.status
            })
        })
        global.logger.info(`Model - Get list product success: ${JSON.stringify(data.product)}`);
        data.info = {
            total_page: Math.ceil(results[0].page / 10),
        }
        global.logger.info(`Model - Get info product success: ${JSON.stringify(data.info)}`);

        return data;

    } catch (error) {
        global.logger.error(`Model - Error query getListProduct: ${error}`)
        throw error({ message: error })
    }

}

const getProductByID = async (id) => {
    try {
        const results = await pool
            .getData(
                queries.Product.getProductByID,
                [id]
            );
        global.logger.info(`Model - Get product by id success: ${JSON.stringify(results[0])}`);
        return results[0];
    } catch (error) {
        global.logger.error(`Model - Error query getProductByID: ${error}`)
        throw error({ message: error })
    }
}
const updateProductByID = async (id, productUpdate) => {
    try {
        const results = await pool
            .setData(
                queries.Product.updateProductByID,
                [productUpdate, id]
            );
        global.logger.info(`Model - Update product by id success: ${JSON.stringify(results)}`);
        return results;
    } catch (error) {
        global.logger.error(`Model - Error query updateProductByID: ${error}`)
        throw error({ message: error })
    }
}

const deleteProductByID = async (id) => {
    try {
        const results = await pool
            .setData(
                queries.Product.deleteProductByID,
                [id]
            );
        global.logger.info(`Model - Delete product by id success: ${JSON.stringify(results)}`);
        return results;
    } catch (error) {
        global.logger.error(`Model - Error query deleteProductByID: ${error}`)
        throw error({ message: error })
    }
}

const searchProductBy = async (searchBy, keywords) => {
    try {
        const results = await pool
            .getData(
                queries.Product.searchProductBy(searchBy, keywords),
                []
            );
        global.logger.info(`Model - Search product by ${searchBy} success: ${JSON.stringify(results)}`);
        return results;
    } catch (error) {
        global.logger.error(`Model - Error query searchProductBy: ${error}`)
        throw error({ message: error })
    }
}

module.exports = {
    createProductDetails,
    getListProduct,
    getProductByID,
    updateProductByID,
    deleteProductByID,
    searchProductBy,
}
