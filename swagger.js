// https://www.youtube.com/watch?v=Ck-CoNNn89g&ab_channel=NHNTV
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Users API',
    version: "1.0.0",
    description: 'Users API'
  },
  tags: [
    {
      name: 'API',
      description: 'API endpoints'
    }
  ],
  host: 'localhost:3000',
  basePath: "/api/users"
};

const outputFile = './swagger-output.json';
const routes = ['./routes/users.js'];

swaggerAutogen()(outputFile, routes, doc);
