const Joi = require('joi');
const pool = require('../services/query.Service');
const queries = require('../queries/queryModal');

const categorySchema = Joi.object({
    name: Joi.string().required().min(3),
})

const createCategory = async (data) => {
    try {
        const { error, value } = categorySchema.validate(data);
        if (error) {
            global.logger.error(`Model - Error validate createCategory: ${error}, value: ${data}`);
            throw error({ message: error.message });
        } else {
            const result = await pool
                .setData(
                    queries.Category.createCategory,
                    [value.name]
                );
            global.logger.info(`Model - Create category success id: ${JSON.stringify(result)}`);
            return result;
        }
    } catch (error) {
        global.logger.error(`Model - Error createCategory: ${error}`);
        throw error;
    }
}

const getListCategory = async () => {
    try {
        const results = await pool.getData(
            queries.Category.getListCategory,
            []
        );
        const data = results.map((item) => item.name);
        global.logger.info(`Model - Get list category success: ${JSON.stringify(data)}`);
        return data;
    } catch (error) {
        global.logger.error(`Model - Error getListCategory: ${error}`);
        throw error;
    }
}

const updateCategory = async (name, data) => {
    try {
        const results = await pool
            .setData(
                queries.Category.updateCategory,
                [data, name]
            );
        global.logger.info(`Model - Update category success: ${JSON.stringify(results)}`);
        return results;
    } catch (error) {
        global.logger.error(`Model - Error updateCategory: ${error}, query: ${queries.Category.updateCategory}} data: ${data} name: ${name}`);
        throw error;
    }
}

const deleteCategory = async (name) => {
    try {
        const results = await pool
            .setData(
                queries.Category.deleteCategory,
                [name]
            );
        global.logger.info(`Model - Delete category success: ${JSON.stringify(results)}`);
        return results;
    } catch (error) {
        global.logger.error(`Model - Error deleteCategory: ${error}, query: ${queries.Category.deleteCategory}} name: ${name}`);
        throw error;
    }
}

module.exports = {
    createCategory,
    getListCategory,
    updateCategory,
    deleteCategory
}