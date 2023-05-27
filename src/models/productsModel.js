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
    // pool.getPool();
    const query = queries.getListProduct;
    console.log("query", query);
    pool
        .query(query, (err, result) => {
            if (err) {
                console.log("err", err);
                return result(err, null);
            } else {
                console.log("res", result);
                return result;
            }
        })


}

const getProductById = async (product_id) => {
    pool.getPool();
    const query = queries.getProductDetail;
    try {
        const data = await pool.getData(query, [product_id]);
        const result = data[0];
        return result;
    } catch (err) {
        console.log("err", err);
        throw new Error(err);
    }
}

module.exports = { createProductDetails, getListProduct, getProductById };