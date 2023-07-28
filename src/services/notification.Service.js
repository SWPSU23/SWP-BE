const Joi = require('joi')
const time = require('../utilities/timeHelper')
const redis = require('redis')

const redisClient = redis.createClient({
    url: `redis://${global.config.redis.host}:${global.config.redis.port}`,
    password: global.config.redis.password,
    database: global.config.redis.notificationDB,
})
redisClient.connect()
const prefix = 'notification'

const notiSchema = Joi.object({
    title: Joi.string().required().trim().min(3).max(128),
    content: Joi.string().required().trim().min(5).max(256),
    is_read: Joi.boolean().required(),
    created_at: Joi.string().default(time.getNow()),
})
const countUnread = async (employee_id) => {
    // fetch notification from redis
    // key: notification:employee_id
    // value: notification
    // return number of unread notification based on is_read field
    const key = `${prefix}:${employee_id}`
    const notifications = await redisClient.lRange(key, 0, -1)
    const count = notifications.filter((notification) => {
        return !JSON.parse(notification).is_read
    }).length
    return count
}
const fetchNotifications = async (employee_id) => {
    // fetch notification from redis
    // key: notification:employee_id
    // value: notification
    // return list of notification
    const key = `${prefix}:${employee_id}`
    const notifications = await redisClient.lRange(key, 0, -1)
    return notifications.map((notification) => JSON.parse(notification))
}
const addNotification = async (employee_id, notification) => {
    // using list data structure to store notification
    // key: notification:employee_id
    // value: notification
    // add notification to the first of the list
    // if list length > 100, remove the last one
    // add notification to redis
    const { error, value } = notiSchema.validate(notification)
    if (error) {
        global.logger.error(`Model - Error validate : ${error}`)
        throw new Error(error)
    } else {
        const key = `${prefix}:${employee_id}`
        await redisClient.lPush(key, JSON.stringify(value))
        // set expire time for key
        await redisClient.expire(key, 2592000)
        // return notification_id
    }
}
const markAllAsRead = async (employee_id) => {
    // fetch notification from redis
    // key: notification:employee_id
    // value: notification
    // update is_read to true
    // return success
    const key = `${prefix}:${employee_id}`
    // loop to update is_read to true
    for (let index = 0; index < (await redisClient.lLen(key)); index++) {
        const notification = JSON.parse(await redisClient.lIndex(key, index))
        notification.is_read = true
        await redisClient.lSet(key, index, JSON.stringify(notification))
    }
    // return list of notification
    const notifications = await redisClient.lRange(key, 0, -1)
    return notifications.map((notification) => JSON.parse(notification))
}

module.exports = {
    fetchNotifications,
    addNotification,
    markAllAsRead,
    countUnread,
}
