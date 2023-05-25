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

const getProductDetails = (req, res) => {
    try {
        const product = productsModel.getProductDetail(req.params.id);
        console.log(product)
        return product;
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { createProductDetail };