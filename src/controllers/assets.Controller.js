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
        .getFile(req.params.id, fileTypes.product.image)
        .then((result) => {
            // write header mimetype
            // result = JSON.parse(result)
            // print cluster id here to check load balancing
            global.logger.info(`Cluster id: ${process.pid}`)
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
module.exports = {
    uploadProductImage,
    getProductImage,
}
