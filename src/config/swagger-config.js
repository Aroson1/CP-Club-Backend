/* eslint max-len: ["error", { "ignoreComments": true, "ignoreStrings": true }] */
import swaggerJSDoc from 'swagger-jsdoc';


const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'Express API for CP Club',
    version: '1.0.0',
    description: 'This is a REST API application made with Express. It is a part of the CP Club project.',
    contact: {
      name: 'Alex Gijo',
      url: 'https://github.com/Aroson1',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ['src/routes/**/*.route.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export {
  swaggerSpec,
};
