const httpServer = require('http').createServer()
const io = require('socket.io')(httpServer, {
    cors: {
        origin: '*',
    },
})
io.of('/v1/socket').on('connection', (socket) => {
    global.logger.info('a user connected')
    socket.on('disconnect', () => {
        global.logger.info('user disconnected')
    })
})