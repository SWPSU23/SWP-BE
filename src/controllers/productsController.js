const productsModel = require('../models/productsModel');

const createProductDetail = (req, res) => {
    try {
        const check = productsModel.createProductDetails(req.body);
        console.log('status: ' + check)
        res.status(200).send({
            status: 'success',
            message: 'Product details created successfully'
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getListProduct = (req, res) => {
    productsModel.getListProduct()
        .then((product) => {
            console.log("product" + product);
            return res.status(200).json({
                status: 'success',
                message: 'Product fetched successfully',
                product: product
            });
        })
        .catch((error) => {
            return res.status(500).json({ message: error.message });
        })
}

const getProductById = async (req, res) => {
    try {
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