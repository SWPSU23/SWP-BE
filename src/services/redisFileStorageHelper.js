const redis = require('redis')
const crypto = require('crypto')
const config = require('../configs')
const { Readable } = require('stream')

// Create a Redis client
const client = redis.createClient({
    url: `redis://${config.redis.host}:${config.redis.port}/${config.redis.fileDB}`,
    password: config.redis.password,
})
client.connect()
const saveFile = (file, type) => {
    // Hash file
    return hashFile(file, type).then((id) => {
        // Save file to Redis
        client.set(id, file)
        return id
    })
}


const getFile = async (id, type) => {
    let result = await client.get(`${type}:${id}`)
    return result
}
const hashFile = (file, type) => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('md5')
        const stream = createReadStreamFromBuffer(file.buffer)

        stream.on('error', (err) => reject(err))
        stream.on('data', (chunk) => hash.update(chunk))
        stream.on('end', () => {
            const id = `${type}:${hash.digest('hex')}`
            global.logger.info(`File ID: ${id}`)
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
