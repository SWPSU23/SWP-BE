
const config = require('./configs');
const swaggerJSDoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ministore API',
      version: '1.0.0',
      description: 'A sample API'
    },
    servers: [
      {
        url: `http://${config.url}:${config.port}`,
        description: 'Ministore API server'
      }
    ]
  },
  apis: ['./routes/index.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
