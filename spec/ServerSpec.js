var request = require('supertest');
require = require('really-need');

describe('loading express', function() {
  var server;

  beforeEach(function beforeEachTest() {
    /* Using "really-need" module to prevent node module
       system to cache javscript files by default to 
       avoid loading and compiling the same files mutiple times.
       Doing this will ensure each test to start with a 
       fresh server.
    */
    server = require('./server', {bustCache: true});
  });

  afterEach(function afterEachTest(done) {
    server.close(done);
  });

  it('should respond to /', function testHomePage(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('shoud 404 everything else', function test404(done) {
    request(server)
      .get('/some/path/')
      .expect(404, done);
  });
});
