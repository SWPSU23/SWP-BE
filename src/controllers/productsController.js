const productsModel = require('../models/productsModel');

const createProductDetail = async (req, res) => {
    try {
        const check = await productsModel.createProductDetails(req.body);
        console.log(check)
        res.status(200).send({ status: check, message: 'Product details created successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { createProductDetail };