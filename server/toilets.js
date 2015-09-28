var db = require('./db/db.js');

var validateLatLong = function (lat, lon){
  var ck_lat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  var ck_lon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
  var validLat = ck_lat.test(lat);
  var validLon = ck_lon.test(lon);
  if(validLat && validLon) {
      return true;
  }
  return false;
};

exports.getToilets = function (req, cb) {
  if(req.query.latitude && req.query.longitude && req.query.radius) {
    // query for toilets within radius
    var lat = req.query.latitude;
    var long = req.query.longitude;
    var r = req.query.radius;
    if (validateLatLong(lat, long)) {
      // TODO: query database and return real data
      cb([]);
    } else {
      cb({ message: 'invalid coordinates given'});
    }
  }
};

exports.addToilet = function (req, cb) {

};

exports.updateToilet = function (req, cb) {


};
