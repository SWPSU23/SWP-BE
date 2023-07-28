const dashboard = require('../services/dashboard.Service')
module.exports = (io, socket) => {
    socket.on('dashboard:read', (data) => {
        global.logger.info('dashboard:read', data)
        // return hello to client

        socket.emit('dashboard:read', {
            message: 'hello from server',
            data: dashboard.getDashboardData(),
        })
    })
}
