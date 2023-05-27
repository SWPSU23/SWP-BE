const pool = require('../services/queryHelper').getPool();
const queries = require('../queries/queryModal');
// eslint-disable-next-line no-unused-vars
const time = require('../utilities/timeHelper');
const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    unit: Joi.string().required(),
    unit_price: Joi.number().required(),
    stock: Joi.number().required(),
    status: Joi.string().default(null),
    image: Joi.string().default(null),
    create_at: Joi.string().default(time.getNow),
    expired_at: Joi.string().default(null),
});

const createProductDetails = (product) => {
    pool.getPool();
    const { err, value } = productSchema.validate(product);
    if (err) {
        console.log(err);
        throw new Error(err);
    } else {
        const query = queries.createProductDetail;
        try {
            const data = pool.setData(query, [
                value.name,
                value.description,
                value.unit,
                value.unit_price,
                value.stock,
                value.status,
                value.image,
                value.create_at,
                value.expired_at,
            ]);
            if (data) return true;
            return false;
        } catch (err) {
            console.log("err", err);
            throw new Error(err);
        }
    }
}


const getListProduct = () => {
    const query = queries.getListProduct;
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                console.error('Error executing the query: ', error);
                reject(error);
            } else {
                console.log('Got the results from the database: ', results);
                resolve(results);
            }
        });
    });
};

const getProductByID = (id) => {
    const query = queries.getProductByID;
    return new Promise((resolve, reject) => {
        pool.query(query, [id], (error, results) => {
            if (error) {
                console.error('Error executing the query: ', error);
                reject(error);
            } else {
                console.log('Got the results from the database: ', results);
                resolve(results);
            }
        });
    });
};
const updateProductByID = (id, product) => {
    const query = queries.updateProductByID;
    const { err, value } = productSchema.validate(product);
    if (err) {
        console.log(err);
        throw new Error(err);
    } else {
        try {
            const data = pool.setData(query, [
                value.name,
                value.description,
                value.unit,
                value.unit_price,
                value.stock,
                value.status,
                value.image,
                value.expired_at,
                id,
            ]);
            if (data) return true;
            return false;
        } catch (err) {
            console.log("err", err);
            throw new Error(err);
        }
    }
}

module.exports = {
    createProductDetails,
    getListProduct,
    getProductByID,
    updateProductByID,
};