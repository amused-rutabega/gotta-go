var request = require('supertest');
describe('loading express', function() {
  var server;

  beforeEach(function() {
    server = require('./server');
  });

  afterEach(function() {
    server.close();
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
