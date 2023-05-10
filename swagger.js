const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ministore APi',
      version: '1.0.0',
      description: 'A sample API'
    },
    servers: [
      {
        url: `http://${process.env.HOST}:${process.env.PORT}`,
        description: 'Local server'
      }
    ]
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJSDoc(options);

module.exports = function (app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
