var Sequelize = require('sequelize');
var dummyCoords = require('./extractData');

var sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_SERVER,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Tablename must be lowercase or our query for toilets in given radius won't work
var Toilet = sequelize.define('toilet', {
  title: Sequelize.STRING,
  latitude: Sequelize.DECIMAL,
  longitude: Sequelize.DECIMAL,
  cleanliness: Sequelize.INTEGER,
  privacy: Sequelize.INTEGER,
  accessibility: Sequelize.INTEGER,
  familyFriendliness: Sequelize.INTEGER,
  rating: Sequelize.INTEGER,
  ambiance: Sequelize.INTEGER,
  free: Sequelize.BOOLEAN
});

exports.Toilet = Toilet;
exports.sequelize = sequelize;
exports.sync = function () {
  sequelize.query('CREATE EXTENSION IF NOT EXISTS cube;');
  sequelize.query('CREATE EXTENSION IF NOT EXISTS earthdistance;');

  return Toilet.sync({force: false}).then(function () {
    // Inert dummy data
    for (var i = 0; i < dummyCoords.length; i += 1) {
      var latitude = dummyCoords[i].latitude;
      var longitude = dummyCoords[i].longitude;
      Toilet.create({
        title: 'dummy',
        latitude: latitude,
        longitude: longitude,
        cleanliness: 5,
        privacy: 5,
        accessibility: 5,
        familyFriendliness: 5,
        rating: 5,
        ambiance: 5,
        free: true
      }, {
        logging: function () {
          // We don't want to pollute our log
        }
      });
    }
    console.log('database initialized and dummy data are loaded');
  });
};
