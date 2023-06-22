const redisHelper = require('../services/redisFileStorageHelper')
const fileTypes = require('../configs/enumeration').fileTypes

const uploadProductImage = (req, res) => {
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
    // convert buffer to base64 string
    const buffer = req.file.buffer.toString('base64')
    // generate json object to save to redis
    const file = {
        contentType: req.file.mimetype,
        data: buffer,
    }
    // Save file to Redis
    redisHelper
        .saveFile(JSON.stringify(file), fileTypes.product.image)
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            global.Logger.error(err)
            res.status(500).json({
                message: err.message,
            })
        })
}

const getProductImage = (req, res) => {
    const id = req.params.id
    redisHelper
        .getFile(id, fileTypes.product.image)
        .then((result) => {
            // write header mimetype
            result = JSON.parse(result)
            res.setHeader('Content-Type', result.contentType)
            res.status(200).send(Buffer.from(result.data, 'base64'))
        })
        .catch((err) => {
            global.Logger.error(err)
            res.status(500).json({
                message: err.message,
            })
        })
}
module.exports = {
    uploadProductImage,
    getProductImage,
}
