// brew install postgresql
// "psql" for cli interface
// in psql "CREATE DATABASE toilets"
// in psql "\c toilets"
// in psql "\i {{currentPath}}/server/db/schema.sql" to load dummy data 

var Sequelize = require('sequelize');

var sequelize = new Sequelize('toilets', 'Drew', '', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

//our dummy data doesn't have createdAt and updatedAt properties
var Toilet = sequelize.define('toilet', {
  latitude: 'decimal',
  longitude: 'decimal',
  title: 'text'
}, {
  timestamps: false
});

Toilet.sync().then(function () {
})

exports.Toilet = Toilet;