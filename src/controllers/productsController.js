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
        res.status(200).json(product);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


module.exports = { createProductDetail, getListProduct };