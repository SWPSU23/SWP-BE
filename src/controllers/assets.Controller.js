const redisHelper = require('../services/redisFileStorage.Service')
const fileTypes = require('../configs/enumeration.Config').fileTypes

const uploadProductImage = async (req, res) => {
    // Check if file is present
    if (!req.file) {
        res.status(400).send('No file uploaded.')
        return
    }
    // Check if file is an image
    if (!fileTypes.mimeType.image.includes(req.file.mimetype)) {
        res.status(400).send('File is not an image.')
        return
    }
    // Save file to Redis
    redisHelper
        .saveFile(req.file.buffer, fileTypes.product.image)
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            global.logger.error(err)
            res.status(500).json({
                message: err.message,
            })
        })
}

const getProductImage = async (req, res) => {
    redisHelper
        .getImage(req.params.id, fileTypes.product.image)
        .then((result) => {
            // write header mimetype
            res.setHeader('Content-Type', 'image/jpeg')
            res.status(200).send(Buffer.from(result.data))
        })
        .catch((err) => {
            global.logger.error("err:", err)
            res.status(500).json({
                message: err.message,
            })
        })
}
const getSalaryPdf = async (req, res) => {
    const employee_id = req.params.employee_id
    const month_year = req.params.month_year
    // get pay slip based on employee id and month yea
    redisHelper
        .getPaySlip(employee_id, month_year)
        .then((result) => {
            // write header mimetype
            res.setHeader('Content-Type', 'application/pdf')
            res.status(200).send(Buffer.from(result.data))
        })
        .catch((err) => {
            global.logger.error("err:", err)
            res.status(404).json({
                message: `Pay slip of employee ${employee_id} in month ${month_year} not found.`,
            })
        })
}
module.exports = {
    uploadProductImage,
    getProductImage,
    getSalaryPdf,
}