const pool = require('../services/query.Service');
const queries = require('../queries/queryModal')
const time = require('../utilities/timeHelper')
const Joi = require('joi')

const productSchema = Joi.object({
    name: Joi.string().min(5).max(64).required().trim(),
    description: Joi.string().required().min(5).max(10240).trim(),
    unit: Joi.string().required().min(1).max(32).trim(),
    cost_price: Joi.number().required().min(5000),
    stock: Joi.number().integer().required().min(1),
    retail_price: Joi.number().required().min(10000).greater(Joi.ref('cost_price')),
    category: Joi.string().min(3).max(64).required().trim(),
    status: Joi.string().default('available'),
    image: Joi.string().min(32).max(32).required(),
    create_at: Joi.string().default(time.getNow),
    expired_at: Joi.string().required().pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/),
});

const createProductDetails = async (product) => {
    const { error, value } = productSchema.validate(product)
    if (error) {
        global.logger.error(`Model - Error validate product: ${error}`)
        throw new Error(error);
    } else {
        try {
            console.log(value)
            const results = await pool
                .setData(
                    queries.Product.createProductDetail,
                    [
                        value.name,
                        value.description,
                        value.unit,
                        value.cost_price,
                        value.stock,
                        value.retail_price,
                        value.retail_price - value.cost_price,
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
                revenue_price: item.revenue_price,
                category: item.category,
                image: item.image,
                create_at: time.timeStampToDay(item.create_at),
                expired_at: time.timeStampToDay(item.expired_at),
                status: item.status
            })
        })
        data.info = {
            total_page: Math.ceil(results[0].page / 10),
        }
        global.logger.info(`Model - Get list product success: ${data.product.length}`)
        return data;

    } catch (error) {
        global.logger.error(`Model - Error query getListProduct: ${error}`)
        throw error;
    }

}

const getProductByID = async (id) => {
    try {
        const results = await pool
            .getData(
                queries.Product.getProductByID,
                [id]
            );
        if (results.length === 0) {
            global.logger.info(`Model - Product not found: ${id}`)
            throw new Error(`ValidationError: Product not found id_${id}`);
        }
        const data = {
            id: results[0].id,
            name: results[0].name,
            description: results[0].description,
            unit: results[0].unit,
            cost_price: results[0].cost_price,
            retail_price: results[0].retail_price,
            revenue_price: results[0].revenue_price,
            stock: results[0].stock,
            category: results[0].category,
            image: results[0].image,
            create_at: time.timeStampToDay(results[0].create_at),
            expired_at: time.timeStampToDay(results[0].expired_at),
            status: results[0].status
        }
        return data;
    } catch (error) {
        global.logger.error(`Model - Error query getProductByID: ${error}`)
        throw error;
    }
}
const updateProductByID = async (id, productUpdate) => {
    try {
        const { error, value } = productSchema.validate(productUpdate);
        if (error) {
            global.logger.error(`Model - Error validate product: ${error}`)
            throw new Error(error);
        } else {
            const results = await pool
                .setData(
                    queries.Product.updateProductByID,
                    [
                        value,
                        id
                    ]
                );
            return results;
        }
    } catch (error) {
        global.logger.error(`Model - Error query updateProductByID: ${error}`)
        throw error;
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
        throw error;
    }
}

const searchProductBy = async (searchBy, keywords) => {
    try {
        const results = await pool
            .getData(
                queries.Product.searchProductBy(searchBy.trim(), keywords.trim()),
                []
            );
        global.logger.info(`Model - Search product by ${searchBy} success: ${JSON.stringify(results)}`);
        return results;
    } catch (error) {
        global.logger.error(`Model - Error query searchProductBy: ${error}`)
        throw error;
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
