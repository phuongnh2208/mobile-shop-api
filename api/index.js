const serverless = require('serverless-http');
const app = require('../src/apps/app');

module.exports = serverless(app);
