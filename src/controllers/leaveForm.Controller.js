const leaveFormModel = require('../models/leaveForm.Model');

const getAllLeaveForm = async (req, res) => {
    try {
        const results = await leaveFormModel.getAllLeaveForm(req.query.page_index);
        res
            .status(200)
            .json(results);
    } catch (error) {
        res
            .status(500)
            .json({ message: error.message });
    }
}

const createLeaveForm = async (req, res) => {
    try {
        const data = await leaveFormModel.createLeaveForm(req.body);
        res
            .status(201)
            .json(data);
    } catch (error) {
        res
            .status(500)
            .json({ message: error.message });
    }
}

const updateLeaveForm = async (req, res) => {
    try {
        const data = await leaveFormModel.updateLeaveForm(req.body, req.params.id);
        res
            .status(200)
            .json(data);
    } catch (error) {
        res
            .status(500)
            .json({ message: error.message });
    }
}

const getLeaveFormByEmployee = async (req, res) => {
    try {
        const results = await leaveFormModel.getLeaveFormByEmployee(req.query.employee_id);
        res
            .status(200)
            .json(results);
    } catch (error) {
        res
            .status(500)
            .json({ message: error.message });
    }
}

module.exports = {
    getAllLeaveForm,
    createLeaveForm,
    updateLeaveForm,
    getLeaveFormByEmployee
}