const registerJoinRoomHandler = require('./joinRoom.Handler')
const registerNotificationHandler = require('./notification.Handler')
const registerDashboardHandler = require('./dashboard.Handler')

const onConnection = (io, socket) => {
    registerJoinRoomHandler(io, socket)
    registerNotificationHandler(io, socket)
    registerDashboardHandler(io, socket)
}
module.exports = onConnection
