const usersModel = require('../models/usersModel');

const getListUser = (req, res) => {
    try {
        console.log("contrroller");
        return usersModel.getListUser();
    } catch {

    }
}

module.exports = getListUser;