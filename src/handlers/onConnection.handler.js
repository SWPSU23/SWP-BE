const registerNotificationHandler = require('./notification.handler')
const registerDashboardHandler = require('./dashboard.handler')

const onConnection = (io, socket) => {
    registerNotificationHandler(io, socket)
    registerDashboardHandler(io, socket)
}
module.exports = onConnection
