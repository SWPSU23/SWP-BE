const notification = require('../services/notification.Service')
const action = {
    fetch: 'notification:fetch',
    add: 'notification:add',
    update: 'notification:update',
    markAllAsRead: 'notification:markAllAsRead',
    countUnread: 'notification:countUnread',
}
module.exports = (io, socket) => {
    socket.on(action.fetch, async (data) => {
        global.logger.info(`${action.fetch} ${typeof data}`)
        const notifications = await notification.fetchNotifications(
            data.employee_id
        )

        socket.emit(action.fetch, {
            message: 'success',
            data: notifications,
        })
    })
    // count unread notification
    socket.on(action.countUnread, async (data) => {
        global.logger.info(`${action.countUnread} ${typeof data}`)
        const count = await notification.countUnread(data.employee_id)
        socket.emit(action.countUnread, {
            message: 'success',
            data: count,
        })
    })
    // mark all as read
    socket.on(action.markAllAsRead, async (data) => {
        global.logger.info(`${action.markAllAsRead} ${typeof data}`)
        const notifications = await notification.markAllAsRead(data.employee_id)
        socket.emit(action.markAllAsRead, {
            message: 'success',
            data: notifications,
        })
    })
    // send notification to client
    socket.on(action.add, async (data) => {
        global.logger.info(`${action.add} ${typeof data}`)
        const notification_id = await notification.addNotification(
            data.employee_id,
            data.notification
        )
        // fetch notification from redis
        // key: notification:employee_id
        // value: notification
        // return list of notification
        const notifications = await notification.fetchNotifications(
            data.employee_id
        )
        // update notification to client
        socket.to(data.employee_id).emit(action.fetch, {
            message: 'hello from server',
            data: notifications,
        })
        socket.emit(action.add, {
            message: 'hello from server',
            data: notifications,
        })
    })
}
