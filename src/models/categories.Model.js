const Joi = require('joi');
const pool = require('../services/queryHelper').getPool();
const queries = require('../queries/queryModal');

const categorySchema = Joi.object({
    name: Joi.string().required().min(3),
})

const createCategory = (data) => {
    const { value, error } = categorySchema.validate(data);
    if (error) {
        global.logger.error(`Model - Error validate category: ${error}`);
        throw error({ message: error });
    } else {
        return new Promise((resolve, reject) => {
            pool.query(queries.Category.createCategory, [value.name], (error, results) => {
                if (error) {
                    global.logger.error(`Model - Error query createCategory: ${error}`);
                    reject(error);
                } else {
                    global.logger.info(`Model - Create category success: ${results}`);
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
                global.logger.error(`Model - Error query getListCategory: ${error}`);
                reject(error);
            } else {
                const data = [];
                // convert object to 1 array
                results.forEach(element => data.push(element.name));
                global.logger.info(`Model - Get list category success: ${data}`);
                resolve(data);
            }
        })
    })
}

const updateCategory = (name, data) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.Category.updateCategory, [data, name], (error, results) => {
            if (error) {
                global.logger.error(`Model - Error query updateCategory: ${error}`);
                reject(error);
            } else {
                global.logger.info(`Model - Update category success: ${results}`);
                resolve(results);
            }
        })
    })
}

const deleteCategory = (name) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.Category.deleteCategory, [name], (error, results) => {
            if (error) {
                global.logger.error(`Model - Error query deleteCategory: ${error}`);
                reject(error);
            } else {
                global.logger.info(`Model - Delete category success: ${results}`);
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