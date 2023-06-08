const pool = require('../services/queryHelper').getPool()
const queries = require('../queries/queryModal')
const time = require('../utilities/timeHelper')
const Joi = require('joi')

const productSchema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    description: Joi.string().required(),
    unit: Joi.string().required(),
    unit_price: Joi.number().required().min(100),
    stock: Joi.number().integer().required().min(1),
    status: Joi.boolean().default(true),
    image: Joi.string().required(),
    create_at: Joi.string().default(time.getNow),
    expired_at: Joi.string().required(),
})

const createProductDetails = (product) => {
    const query = queries.createProductDetail
    const { error, value } = productSchema.validate(product)

    if (error) {
        console.error('Error executing the query: ', error)
        throw error
    } else {
        return new Promise((resolve, reject) => {
            pool.query(
                query,
                [
                    value.name,
                    value.description,
                    value.unit,
                    value.unit_price,
                    value.stock,
                    value.status,
                    value.image,
                    value.create_at,
                    value.expired_at,
                ],
                (error, results) => {
                    if (error) {
                        console.error('Error executing the query: ', error)
                        reject(error)
                    } else {
                        console.log(
                            'Got the results from the database: ',
                            results
                        )
                        resolve(results)
                    }
                }
            )
        })
    }
}

const getListProduct = () => {
    const query = queries.getListProduct
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

const getProductByID = (id) => {
    const query = queries.getProductByID
    return new Promise((resolve, reject) => {
        pool.query(query, [id], (error, results) => {
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
const updateProductByID = (id, productUpdate) => {
    const query = queries.updateProductByID
    return new Promise((resolve, reject) => {
        pool.query(query, [productUpdate, id], (error, results) => {
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

const deleteProductByID = (id) => {
    const query = queries.deleteProductByID
    return new Promise((resolve, reject) => {
        pool.query(query, [id], (error, results) => {
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
}
