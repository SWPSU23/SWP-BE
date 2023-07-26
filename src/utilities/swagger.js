const swaggerJSDoc = require('swagger-jsdoc')
const url = function () {
    if (global.config.isDev) {
        return `http://localhost:${global.config.port}/v1`
    } else {
        return `https://${global.config.domain}/v1`
    }
}
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ministore API',
            version: '1.0.0',
            description: 'API for Ministore',
        },
        servers: [
            {
                url: url(),
                description: 'Ministore API server',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
}
const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec
