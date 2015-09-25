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

var Toilet = sequelize.define('toilet', {
  latitude: 'decimal',
  longitude: 'decimal',
  title: 'text'
});

Toilet.sync({}).then(function () {
})

exports.Toilet = Toilet;