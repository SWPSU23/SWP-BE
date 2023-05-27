const employeesModel = require('../models/employeesModel');

const createEmployeeDetail = (req, res) => {
    try {
        const check = employeesModel.createEmployeeDetail(req.body);
        if (check) {
            res.status(200).json({
                status: 'success',
                message: 'Employee Detail created successfully',
            });
        } else {
            throw new Error();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getListEmployee = async (req, res) => {
    try {
        const listProduct = await employeesModel.getListEmployee();
        res.status(200).json({
            status: 'success',
            message: 'Employee List created successfully',
            data: listProduct,
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}


module.exports = { createEmployeeDetail, getListEmployee };