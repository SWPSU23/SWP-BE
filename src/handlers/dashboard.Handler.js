const dashboard = require('../services/dashboard.Service')
const action = {
    read: 'dashboard:read',
    update: 'dashboard:update',
}
const triggerSendDashboard = (io, socket) => {
    // trigger send dashboard to all client
    socket.on(action.update, async () => {
        // read dashboard from redis
        const dashboard_data = await dashboard.getDashboardData()
        // send dashboard to all client
        io.emit(action.update, {
            message: 'success',
            data: dashboard_data,
        })
    })
}
const registerDashboardHandler = (io, socket) => {
    socket.on(action.read, (data) => {
        global.logger.info(action.read, data)
        const response = dashboard.getDashboardData()
        socket.emit(action.read, {
            message: 'success',
            data: response,
        })
    })
}

module.exports = {
    registerDashboardHandler,
    triggerSendDashboard,
}
