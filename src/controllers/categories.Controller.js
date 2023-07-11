const categoryModel = require('../models/categories.Model');

const createCategory = (req, res) => {
    categoryModel.createCategory(req.body)
        .then((results) => {
            res.status(200).send({
                status: true,
                data: results,
            });
        })
        .catch((error) => {
            res.status(500).send({
                status: false,
                message: error.message,
            })
        })
}

const getListCategory = (req, res) => {
    categoryModel.getListCategory()
        .then((results) => {
            res.status(200).send({
                status: true,
                data: results,
            });
        })
        .catch((error) => {
            res.status(500).send({
                status: false,
                message: error.message,
            })
        })
}

const updateCategory = (req, res) => {
    categoryModel.updateCategory(req.params.name, req.body)
        .then((results) => {
            res.status(200).send({
                status: true,
                data: results,
            });
        })
        .catch((error) => {
            res.status(500).send({
                status: false,
                message: error.message,
            })
        })
}

const deleteCategory = (req, res) => {
    categoryModel.deleteCategory(req.params.name)
        .then((results) => {
            res.status(200).send({
                status: true,
                data: results,
            });
        })
        .catch((error) => {
            res.status(500).send({
                status: false,
                message: error.message,
            })
        })
}

module.exports = {
    createCategory,
    getListCategory,
    updateCategory,
    deleteCategory
}