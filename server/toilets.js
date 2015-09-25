var db = require('./db/db.js');

var getToilets = function (req, cb) {
  // use req.body.latitude, req.body.longitude, req.body.radius
  if(req.body.latitude && req.body.longitude && req.body.radius) {
    // query for toilets within radius
  } else {
    db.Toilet.findAll()
    .then(function (toilets) {
      cb(toilets);
    });
  }
};

exports.getToilets = getToilets;
