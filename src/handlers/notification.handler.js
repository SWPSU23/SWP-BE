const notification = require('../services/notification.Service')
const action = {
    fetch: 'notification:fetch',
    add: 'notification:add',
    markAsRead: 'notification:markAsRead',
    markAllAsRead: 'notification:markAllAsRead',
    delete: 'notification:delete',
}
module.exports = (io, socket) => {
    socket.on(action.fetch, async (data) => {
        global.logger.info(`${action.fetch} ${typeof(data)}`)
        // return hello to client
        const notifications = await notification.fetchNotifications(
            data.employee_id
        )
        socket.emit(action.fetch, {
            message: 'hello from server',
            data: notifications,
        })
    })
    socket.on(action.add, async (data) => {
        global.logger.info(`${action.add} ${typeof(data)}`)
        // return hello to client
        const notification_id = await notification.addNotification(
            data.employee_id,
            data.notification
        )
        socket.emit(action.add, {
            message: 'hello from server',
            data: notification_id,
        })
    })
}
