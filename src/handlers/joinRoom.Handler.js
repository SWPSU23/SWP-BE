const employeeModel = require('../models/employees.Model')
module.exports = (io, socket) => {
    socket.on('joinRoom', (data) => {
        // validate if employee_id is exist in database
        // if not exist return error
        // if exist join room
        const { employee_id } = data
        employeeModel.getEmployeeDetail(employee_id).then((results) => {
            if (results.length === 0) {
                socket.emit('joinRoomError', {
                    message: 'Employee not found',
                })
            } else {
                socket.join(employee_id)
                socket.emit('joinRoomSuccess', {
                    message: 'Join room success',
                })
            }
        }).catch((error) => {
            global.logger.error(`Handler - Error joinRoom: ${error}`)
            socket.emit('joinRoomError', {
                message: 'Server error',
            })
        })
    })
}
