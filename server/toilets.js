var db = require('./db/db.js');
var Toilet = db.Toilet;
var sequelize = db.sequelize;
var _ = require('underscore');

// Helper function to validate coordinates
// http://stackoverflow.com/questions/11475146/javascript-regex-to-validate-gps-coordinates
var isValid = function (latitude, longitude){
  var checkLatitute = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  var checkLongitude = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

  var validLatitute = checkLatitute.test(latitude);
  var validLongitude = checkLongitude.test(longitude);

  return validLatitute && validLongitude;
};

exports.getToilets = function (req, cb) {
  if(req.query.latitude && req.query.longitude && req.query.radius) {
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    var r = req.query.radius;
    if (isValid(latitude, longitude)) {
      var query = 'SELECT * FROM toilets WHERE earth_box(ll_to_earth(:latitude, :longitude), :radius) @> ll_to_earth(toilets.latitude, toilets.longitude);';

      sequelize.query(query, {
        replacements: {
          latitude: latitude,
          longitude: longitude,
          radius: r
        },

        type: sequelize.QueryTypes.SELECT
      })
        .then(function (toilets) {
          var formattedToilets = [];

          toilets.forEach(function (toilet) {
            toilet = {
              id: toilet.id,

              position: {
                latitude: toilet.latitude,
                longitude: toilet.longitude
              },

              ratings: _.omit(toilet, 'id', 'title', 'latitude', 'longitude', 'createdAt', 'updatedAt')
            };

            formattedToilets.push(toilet);
          });

          cb(formattedToilets);
        });
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
      Toilet.create({
        latitude: latitude,
        longitude: longitude
      }).then(function (toilet) {
        toilet = {
          id: toilet.id,

          position: {
            latitude: toilet.latitude,
            longitude: toilet.longitude
          },

          ratings: {

          }
        };

        cb(true, 'toilet added', toilet);
      });
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
        Toilet.find({where: {id: req.params.id}})
          .then(function (toilet) {
            if (toilet) {
              return toilet.updateAttributes({
                latitude: latitude,
                longitude: longitude
              });
            } else {
              cb(false, 'toilet was not found');
            }
          })
          .then(function (toilet) {
            if (toilet) {
              toilet = {
                id: toilet.id,

                position: {
                  latitude: latitude,
                  longitude: longitude
                },

                ratings: req.body.ratings
              };

              cb(true, 'toilet updated', toilet);
            } else {
              cb(false, 'toilet was not found');
            }
          });
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
