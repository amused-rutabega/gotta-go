var request = require('supertest');
var reallyNeed = require('really-need');

describe('loading express', function () {
  var server;

  beforeEach(function () {
    /* Using "really-need" module to prevent node module
       system to cache javscript files by default to
       avoid loading and compiling the same files mutiple times.
       Doing this will ensure each test to start with a
       fresh server.
    */
    server = reallyNeed(__dirname + '/../server/server', {bustCache: true});
  });

  afterEach(function (done) {
    server.close(done);
  });

  it('should respond to /', function (done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('should respond to /api/toilets and return toilets in json format', function (done) {
    request(server)
      .get('/api/toilets')
      .query({ latitude: 37.7827097 })
      .query({ longitude: -122.4080675})
      .query({ radius: 100 })
      .expect('Content-type', /json/)
      .expect(200, done);
  });

  it('should allow data to be posted to /api/toilets given correct format', function (done) {
    var postBody = {
      position: {
        latitude: 78,
        longitude: -122
      },
      ratings: {
        cleanliness: 5,
        privacy: 4
      }
    };
    request(server)
      .post('/api/toilets')
      .send(postBody)
      .expect(201, {
        message: 'toilet added',
        toilet: {
          id: 111,
          
          position: {
            latitude: 78,
            longitude: -122
          },
          ratings: {

          }
        }
      }, done);
  });

  it('should reject post to /api/toilets if post body is not valid', function (done) {
    var postBody = {
      aettqr: {
        latitude: 78,
        longitude: -122
      },
      fhyen: {
        cleanliness: 5,
        privacy: 4
      }
    };
    request(server)
      .post('/api/toilets')
      .send(postBody)
      .expect(400, done);
  });

  it('should reject post to /api/toilets if coordinates are not valid', function (done) {
    var postBody = {
      position: {
        latitude: 'abbff',
        longitude: '255&^^$@'
      },
      ratings: {
        cleanliness: 5,
        privacy: 4
      }
    };
    request(server)
      .post('/api/toilets')
      .send(postBody)
      .expect(400, done);
  });

  it('should accept put to /api/toilets if put body is valid', function (done) {
    var putBody = {
      position: {
        latitude: 78,
        longitude: -122
      },
      ratings: {
        cleanliness: 5,
        privacy: 4
      }
    };
    request(server)
      .put('/api/toilets/5')
      .send(putBody)
      .expect(201, {
        message: 'toilet updated',
        toilet: {
          id: 5,

          position: {
            latitude: 78,
            longitude: -122
          },
          ratings: {
            cleanliness: 5,
            privacy: 4
          }
        }
      }, done);
  });

  it('should reject put to /api/toilets if put body is not valid', function (done) {
    var putBody = {
      aettqr: {
        latitude: 78,
        longitude: -122
      },
      fhyen: {
        cleanliness: 5,
        privacy: 4
      }
    };
    request(server)
      .put('/api/toilets/3')
      .send(putBody)
      .expect(400, done);
  });

  it('should reject put to /api/toilets if coordinates are not valid', function (done) {
    var putBody = {
      position: {
        latitude: 'abbff',
        longitude: '255&^^$@'
      },
      ratings: {
        cleanliness: 5,
        privacy: 4
      }
    };
    request(server)
      .put('/api/toilets/4')
      .send(putBody)
      .expect(400, done);
  });


  it('shoud 404 everything else', function (done) {
    request(server)
      .get('/some/path/')
      .expect(404, done);
  });

});
