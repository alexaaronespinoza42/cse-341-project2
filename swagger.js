const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users and Products API',
        description: 'Users and products API Project 2 Part 1'
    },
    host: 'localhost:6215',
    schemes: ['https', 'https']
};

const outputFile = './swagger.json' ;
const endpointsFiles = ['./routes/index.js'];

//swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);    