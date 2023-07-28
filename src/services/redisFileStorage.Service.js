const crypto = require('crypto')
const { Readable } = require('stream')
const redis = require('redis')
const redisClient = redis.createClient({
    url: `redis://${global.config.redis.host}:${global.config.redis.port}`,
    password: global.config.redis.password,
    database: global.config.redis.fileDB,
})
redisClient.connect()
const saveFile = async (file, type) => {
    // Hash file
    return hashFile(file, type).then(async (id) => {
        // check if file exists
        if (await redisClient.hExists(id, 'data')) {
            return id
        }
        // Save file to Redis
        redisClient.hSet(id, 'data', Buffer.from(file))
        return id
    })
}

const getImage = async (id, type) => {
    return await redisClient.hGetAll(
        redis.commandOptions({
            returnBuffers: true,
        }),
        `${type}:${id}`
    )
}
const getPaySlip = async (employee_id, month_year) => {
    return await redisClient.hGetAll(
        redis.commandOptions({
            returnBuffers: true,
        }),
        `PaySlip_${employee_id}_${month_year}`
    )
}
const hashFile = async (file, type) => {
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
    getPaySlip,
    getImage,
}
