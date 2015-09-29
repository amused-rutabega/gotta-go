// brew install postgresql
// "psql" for cli interface
// in psql "CREATE DATABASE toilets"
// in psql "\c toilets"
// in psql "\i {{currentPath}}/server/db/schema.sql" to load dummy data 

var Sequelize = require('sequelize');
var dummyCoords = require('./extractData');

// process.env.DATABASE
// process.env.DATABASE_USERNAME
// process.env.DATABASE_PASSWORD
// process.env.DATABASE_SERVER


var sequelize = new Sequelize('toilets', 'brianleung', '', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

//our dummy data doesn't have createdAt and updatedAt properties
var Toilet = sequelize.define('Toilet', {
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




Toilet.sync({force: true}).then(function () {
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
    });
  }
  Toilet.findAll().then(function (data) {
    for (var j = 0; j < data.length; i += 1) {
      var entry = data[j];
      console.log(entry.getDataValue('latitude'));
      console.log(entry.getDataValue('longitude'));
    }
  });
});




exports.Toilet = Toilet;
