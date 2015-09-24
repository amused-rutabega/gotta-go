var request = require('supertest');
require = require('really-need');

describe('loading express', function () {
  var server;

  beforeEach(function () {
    /* Using "really-need" module to prevent node module
       system to cache javscript files by default to 
       avoid loading and compiling the same files mutiple times.
       Doing this will ensure each test to start with a 
       fresh server.
    */
    server = require(__dirname + '/../server/server', {bustCache: true});
  });

  afterEach(function (done) {
    server.close(done);
  });

  it('should respond to /', function (done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('shoud 404 everything else', function (done) {
    request(server)
      .get('/some/path/')
      .expect(404, done);
  });
});
