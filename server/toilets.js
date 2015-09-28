// var db = require('./db/db.js');


// Helper function to validate coordinates
// http://stackoverflow.com/questions/11475146/javascript-regex-to-validate-gps-coordinates
var isValid = function (lat, lon){
  var checkLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  var checkLong = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
  var validLat = checkLat.test(lat);
  var validLon = checkLong.test(lon);
  if(validLat && validLon) {
      return true;
  }
  return false;
};

exports.getToilets = function (req, cb) {
  if(req.query.latitude && req.query.longitude && req.query.radius) {
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    // var r = req.query.radius;
    if (isValid(latitude, longitude)) {
      // TODO: query database and return real data
      cb([]);
    } else {
      cb({ message: 'invalid coordinates given' });
    }
  } else {
    cb({ message: 'invalid query format' });
  }
};

exports.addToilet = function (req, cb) {
  if (req.body.hasOwnProperty('position') && req.body.hasOwnProperty('ratings')) {
    var latitude = req.body.position.latitude;
    var longitude = req.body.position.longitude;
    if (isValid(latitude, longitude)) {
      // TODO: add toilet to database
      cb(true, 'toilet added');
    } else {
      cb(false, 'invalid coords given');
    }
  } else {
    cb(false, 'invalid post body');
  }
};

exports.updateToilet = function (req, cb) {
  if (req.params.hasOwnProperty('id')) {
    if (req.body.hasOwnProperty('position') && req.body.hasOwnProperty('ratings')) {
      var latitude = req.body.position.latitude;
      var longitude = req.body.position.longitude;
      if (isValid(latitude, longitude)) {
        // TODO: query db and update entry
        cb(true, 'toilet updated');
      } else {
        cb(false, 'invalid coords given');
      }
    } else {
      cb(false, 'invalid put body');
    }
  } else {
    cb(false, 'toilet id not given');
  }
};
