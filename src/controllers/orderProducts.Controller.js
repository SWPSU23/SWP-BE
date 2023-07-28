const orderProductModel = require('../models/orderProducts.Model');

const getListDetailOrder = async (req, res) => {
    try {
        const data = await orderProductModel.getListDetailOrder(req.params.order_id);
        res
            .status(200)
            .send({
                success: true,
                data: data
            })
    } catch (error) {
        res
            .status(500)
            .send({
                success: false,
                message: error.message
            })
    }
}

module.exports = {
    getListDetailOrder
}