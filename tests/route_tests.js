var request = require('supertest');
var app = require('../app').app;
const mocha = require('mocha')
const chai = require('chai')

describe('test to see if our routes are responding', function () {
  beforeEach(function () {
    listeningOnPort = require('../app').listeningOnPort;
  });
  afterEach(function () {
    listeningOnPort.close();
  });
  it('responds to /', function test(done) {
    request(app)
    .get('/')
    .expect(200, done);
  });
  it('responds to /users', function test(done) {
  request(app)
    .get('/users')
    .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(app)
      .get('/foo/bar')
      .expect(404, done);
  });
});
