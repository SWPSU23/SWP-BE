const Joi = require('joi');
const pool = require('../services/queryHelper').getPool();
const queries = require('../queries/queryModal');

const categorySchema = Joi.object({
    name: Joi.string().required().min(3),
})

const createCategory = (data) => {
    const { value, error } = categorySchema.validate(data);
    if (error) {
        throw new Error(error.message);
    } else {
        return new Promise((resolve, reject) => {
            pool.query(queries.Category.createCategory, [value.name], (error, results) => {
                if (error) {
                    global.logger.error(error);
                    reject(error);
                } else {
                    resolve(results);
                }
            })
        })
    }
}

const getListCategory = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.Category.getListCategory, (error, results) => {
            if (error) {
                global.logger.error(error);
                reject(error);
            } else {
                const data = [];
                results.forEach(element => data.push(element.name));
                resolve(data);
            }
        })
    })
}

const updateCategory = (name, data) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.Category.updateCategory, [data, name], (error, results) => {
            if (error) {
                global.logger.error(error);
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
}

const deleteCategory = (name) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.Category.deleteCategory, [name], (error, results) => {
            if (error) {
                global.logger.error(error);
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
}

module.exports = {
    createCategory,
    getListCategory,
    updateCategory,
    deleteCategory
}