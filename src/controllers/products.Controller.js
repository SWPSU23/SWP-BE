const productsModel = require('../models/products.Model')

const createProductDetail = async (req, res) => {
    try {
        const data = await productsModel.createProductDetails(req.body);
        res
            .status(201)
            .send({
                status: true,
                product_id: data.insertId
            });
    } catch (error) {
        if (error.message.includes("ValidationError")) {
            res
                .status(400) // 400 meaning bad request
                .send({
                    success: false,
                    message: error.message
                })
        } else {
            res
                .status(500)
                .send({
                    success: false,
                    message: error.message
                })
        }
    }
}

const getListProduct = async (req, res) => {
    try {
        const data = await productsModel.getListProduct(req.query.page_index);
        res
            .status(200)
            .send({
                status: true,
                data: data
            })
    } catch (error) {
        res
            .status(500)
            .json({
                status: false,
                message: error.message
            })
    }
}

const getProductByID = async (req, res) => {
    try {
        const data = await productsModel.getProductByID(req.params.id);
        res
            .status(200)
            .send({
                status: true,
                data: data
            })
    } catch (error) {
        if (error.message.includes("ValidationError")) {
            res
                .status(400)
                .json({
                    status: false,
                    message: error.message
                })
        } else {
            res
                .status(500)
                .json({
                    status: false,
                    message: error.message
                })
        }
    }
}
const updateProductByID = async (req, res) => {
    try {
        const data = await productsModel.updateProductByID(req.params.id, req.body);
        res
            .status(200)
            .send({
                status: true,
                data: data
            })
    } catch (error) {
        res
            .status(500)
            .json({
                status: false,
                message: error.message
            })
    }
}

const deleteProductByID = (req, res) => {
    productsModel
        .deleteProductByID(req.params.id)
        .then((result) => {
            res
                .status(200)
                .send({
                    status: true,
                    data: result,
                })
        })
        .catch((err) => {
            return res
                .status(500)
                .json({
                    status: false,
                    message: err.message
                })
        })
}

const searchProductBy = (req, res) => {
    productsModel
        .searchProductBy(req.query.searchBy, req.query.keywords)
        .then((data) => {
            res
                .status(200)
                .send({
                    status: true,
                    data: data,
                })
        })
        .catch((error) => {
            res
                .status(500)
                .send({
                    status: false,
                    message: error.message,
                })
        })
}

module.exports = {
    createProductDetail,
    getListProduct,
    getProductByID,
    updateProductByID,
    deleteProductByID,
    searchProductBy,
}
