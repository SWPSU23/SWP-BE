const swaggerJSDoc = require('swagger-jsdoc')
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
                url: `${global.config.isDev
                        ? `http://localhost:${global.config.port}/v1`
                        : `https://${global.config.url}/v1`
                    }`,
                description: 'Ministore API server',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
}
const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec
