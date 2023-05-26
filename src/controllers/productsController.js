const productsModel = require('../models/productsModel');

const createProductDetail = (req, res) => {
    try {
        const check = productsModel.createProductDetails(req.body);
        console.log(check)
        res.status(200).send({ status: check, message: 'Product details created successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getListProduct = async (req, res) => {
    try {
        const product = await productsModel.getListProduct();
        console.log("product" + product);
        res.status(200).send({
            status: 'success',
            message: 'List Product fetched successfully',
            data: product
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const getProductById = async (req, res) => {
    try {
        console.log("id " + req.params.id)
        const product = await productsModel.getProductById(req.params.id);
        console.log("product" + product);
        res.status(200).json({
            status: 'success',
            message: 'Product fetched successfully',
            product: product
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { createProductDetail, getListProduct, getProductById };