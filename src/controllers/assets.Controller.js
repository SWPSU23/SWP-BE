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

const getProductImage = (req, res) => {
    const id = req.params.id
    redisHelper
        .getFile(id, fileTypes.product.image)
        .then((result) => {
            // write header mimetype
            // result = JSON.parse(result)
            res.setHeader('Content-Type', 'image/jpeg')
            res.status(200).send(Buffer.from(result.data))
        })
        .catch((err) => {
            global.logger.error(err)
            res.status(500).json({
                message: err.message,
            })
        })
}
module.exports = {
    uploadProductImage,
    getProductImage,
}
