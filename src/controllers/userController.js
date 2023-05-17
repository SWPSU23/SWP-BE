const usersModel = require('../models/usersModel');

const getListUser = (req, res) => {
    try {
        console.log("contrroller");
        return usersModel.getListUser(res);
    } catch {

    }
}

module.exports = { getListUser };