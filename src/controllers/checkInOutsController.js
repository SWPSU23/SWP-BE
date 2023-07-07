const checkInOutModel = require('../models/checkInOutsModel');

const createCheckInOut = (req, res) => {
    checkInOutModel
        .createCheckInOut(req.body)
        .then((results) => {
            res.status(200).send({
                message: "Success to create check in out",
                data: results
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Failed to create check in out",
                data: error.message
            })
        })
}

const getListCheckInOut = (req, res) => {
    checkInOutModel
        .getListCheckInOut()
        .then((results) => {
            res.status(200).send({
                message: "Success to get list check in out",
                data: results
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Failed to get list check in out",
                data: error.message
            })
        })
}

const updateCheckInOut = (req, res) => {
    checkInOutModel
        .updateCheckInOut(req.body, req.params.id)
        .then((results) => {
            res.status(200).send({
                message: "Success to update check in out",
                data: results
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Failed to update check in out",
                data: error.message
            })
        })
}

const deleteCheckInOut = (req, res) => {
    checkInOutModel
        .deleteCheckInOut(req.params.id)
        .then((results) => {
            res.status(200).send({
                message: "Success to delete check in out",
                data: results
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Failed to delete check in out",
                data: error.message
            })
        })
}

const getCheckInOutDetail = (req, res) => {
    checkInOutModel
        .getCheckInOutDetail(req.params.id)
        .then((results) => {
            res.status(200).send({
                message: "Success to get detail check in out",
                data: results
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Failed to get detail check in out",
                data: error.message
            })
        })
}

const searchCheckInOutBy = (req, res) => {
    checkInOutModel
        .searchCheckInOutBy(req.query.searchBy, req.query.keywords)
        .then((results) => {
            res.status(200).send({
                message: "Success to search check in out",
                data: results
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Failed to search check in out",
                data: error.message
            })
        })
}


module.exports = {
    createCheckInOut,
    getListCheckInOut,
    updateCheckInOut,
    deleteCheckInOut,
    getCheckInOutDetail,
    searchCheckInOutBy
}