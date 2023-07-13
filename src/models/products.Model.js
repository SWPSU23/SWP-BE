const pool = require('../services/queryHelper').getPool()
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

const createProductDetails = (product) => {
    const query = queries.Product.createProductDetail
    const { error, value } = productSchema.validate(product)
    if (error) {
        global.logger.error(`Model - Error validate product: ${error}`)
        throw error({ message: error });
    } else {
        return new Promise((resolve, reject) => {
            pool.query(
                query,
                [
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
                ],
                (error, results) => {
                    if (error) {
                        global.logger.error(`Model - Error query createProductDetails: ${error}`)
                        reject(error)
                    } else {
                        global.logger.info(`Model - Create product success: ${results}`)
                        resolve(results)
                    }
                }
            )
        })
    }
}

const getListProduct = (page_index) => {
    const query = queries.Product.getListProduct(page_index)
    global.logger.info(`Model - Get list product query: ${query}`)
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                global.logger.error(`Model - Error query getListProduct: ${error}`)
                reject(error)
            } else {
                const data = {
                    info: {},
                    product: [],
                }
                data.info = {
                    total_page: Math.ceil(results[0].page / 10)
                }
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
                global.logger.info(`Model - Get list product success: ${data}`)
                resolve(data)
            }
        })
    })
}

const getProductByID = (id) => {
    const query = queries.Product.getProductByID
    return new Promise((resolve, reject) => {
        pool.query(query, [id], (error, results) => {
            if (error) {
                global.logger.error(`Model - Error query getProductByID: ${error}`)
                reject(error)
            } else {
                global.logger.info(`Model - Get product by id success: ${results}`)
                resolve(results[0])
            }
        })
    })
}
const updateProductByID = (id, productUpdate) => {
    const query = queries.Product.updateProductByID
    return new Promise((resolve, reject) => {
        pool.query(query, [productUpdate, id], (error, results) => {
            if (error) {
                global.logger.error(`Model - Error query updateProductByID: ${error}`)
                reject(error)
            } else {
                global.logger.info(`Model - Update product by id success: ${results}`)
                resolve(results)
            }
        })
    })
}

const deleteProductByID = (id) => {
    const query = queries.Product.deleteProductByID
    return new Promise((resolve, reject) => {
        pool.query(query, [id], (error, results) => {
            if (error) {
                global.logger.error(`Model - Error query deleteProductByID: ${error}`)
                reject(error)
            } else {
                global.logger.info(`Model - Delete product by id success: ${results}`)
                resolve(results)
            }
        })
    })
}

const searchProductBy = (searchBy, keywords) => {
    const query = queries.Product.searchProductBy(searchBy, keywords)
    global.logger.info(`Model - Search product by query: ${query}`)
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                global.logger.error(`Model - Error query searchProductBy: ${error}`)
                reject(error)
            } else {
                global.logger.info(`Model - Search product by success: ${results}`)
                resolve(results)
            }
        })
    })
}
const searchProductBy = (searchBy, keyWord) => {
    const query = queries.products.searchProductBy(searchBy, keyWord)
    console.log(query)
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                console.error('Error executing the query: ', error)
                reject(error)
            } else {
                console.log('Got the results from the database: ', results)
                resolve(results)
            }
        })
    })
}

module.exports = {
    createProductDetails,
    getListProduct,
    getProductByID,
    updateProductByID,
    deleteProductByID,
    searchProductBy,
}
