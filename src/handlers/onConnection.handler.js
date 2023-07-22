const registerDashboardHandler = require('./dashboard.handler')

const onConnection = (io, socket) => {
    registerDashboardHandler(io, socket)
}
module.exports = onConnection
