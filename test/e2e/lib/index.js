const supertest = require('supertest');
const server = require('../../../server')
const routes = require('./routes');

const request = supertest(server);
const serverClose = ()=> server.close()

module.exports = {
  request,
  routes,
  serverClose
};
