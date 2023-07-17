const categoryModel = require('../models/categories.Model');

const createCategory = async (req, res) => {
    try {
        const results = await categoryModel.createCategory(req.body);
        // 201 meaning resource successfully created
        res
            .status(201)
            .send({
                status: true,
                category_id: results.insertId,
            });
    } catch (error) {
        res
            .status(500)
            .send({
                status: false,
                message: error.message,
            })
    }
}

const getListCategory = async (req, res) => {
    try {
        const data = await categoryModel.getListCategory();
        res
            .status(200)
            .send({
                status: true,
                data: data,
            })
    } catch (error) {
        res
            .status(500)
            .send({
                status: false,
                message: error.message,
            })
    }
}

const updateCategory = async (req, res) => {
    try {
        const data = await categoryModel.updateCategory(req.params.name, req.body);
        // 201 meaning resource successfully created
        res
            .status(201)
            .send({
                status: true,
                data: data,
            })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message,
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const data = await categoryModel.deleteCategory(req.params.name);
        res
            .status(200)
            .send({
                status: true,
                data: data,
            })
    } catch (error) {
        res
            .status(500)
            .send({
                status: false,
                message: error.message,
            })
    }
}

module.exports = {
    createCategory,
    getListCategory,
    updateCategory,
    deleteCategory
}