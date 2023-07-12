const crypto = require('crypto')
const { Readable } = require('stream')
const saveFile = (file, type) => {
    // Hash file
    return hashFile(file, type).then(async (id) => {
        // check if file exists
        if (await global.redisClient.hExists(id, 'data')) {
            return id
        }
        // Save file to Redis
        global.redisClient.hSet(id, 'data', Buffer.from(file))
        return id
    })
}

const getFile = async (id, type) => {
    global.logger.info(`File ID: ${id}`)
    return await global.redisClient.hGetAll(
        global.redis.commandOptions({
            returnBuffers: true,
        }),
        `${type}:${id}`
    )
}
const hashFile = (file, type) => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('md5')
        const stream = createReadStreamFromBuffer(file)

        stream.on('error', (err) => reject(err))
        stream.on('data', (chunk) => hash.update(chunk))
        stream.on('end', () => {
            const id = `${type}:${hash.digest('hex')}`
            resolve(id)
        })
    })
}

const createReadStreamFromBuffer = (buffer) => {
    const stream = new Readable()
    stream.push(buffer)
    stream.push(null) // Signal the end of the stream
    return stream
}
module.exports = {
    saveFile,
    getFile,
}
