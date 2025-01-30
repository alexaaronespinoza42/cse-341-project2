const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users Api',
        description: 'Users Api'
    },
    host: 'localhost:6215',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json' ;
const endpointsFiles = ['./routes/index.js'];

//swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);