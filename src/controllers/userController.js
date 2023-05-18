const usersModel = require('../models/customers');

const getListUser = (req, res) => {
    try {
        console.log("controller");
        return usersModel.getListUser().then((result) => {
            return res.json({
                message: 'Success',
                data: result,
                });
        });
    } catch {
        return res.json({
            message: 'Error',
        });
    }
}

module.exports = {getListUser};