const dashboard = require('../services/dashboard.Service')
const action = {
    read: 'dashboard:read',
    update: 'dashboard:update',
}
module.exports = (io, socket) => {
    socket.on(action.read, (data) => {
        global.logger.info(action.read, data)
        const response = dashboard.readDashboard(data.employee_id)
        socket.emit(action.read, {
            message: 'success',
            data: response,
        })
    })

    
}
