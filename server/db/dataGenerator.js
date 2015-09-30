var fs = require('fs');

// Use your current latitute and current longitude
var currentLatitute = 37.7837284;
var currentLongitude = -122.4090495;

var radius = 4800; // in meters

// Returns a random coordinate within a given radius
// http://gis.stackexchange.com/questions/25877/how-to-generate-random-locations-nearby-my-location
var randomize = function (radius, currentLatitute, currentLongitude) {
  var radiusInDegrees = radius / 111300;
  var distance = radiusInDegrees * Math.sqrt(Math.random());
  var angle = 2 * Math.PI * Math.random();
  var deltaLatitute = distance * Math.cos(angle);
  var deltaLongitude = distance * Math.sin(angle);
  currentLatitute += deltaLatitute;
  currentLongitude += deltaLongitude;
  return [currentLatitute, currentLongitude];
};


var newLine = '';
var data = '';
for (var i = 0; i < 50; i += 1) {
  var randomCoord = randomize(radius, currentLatitute, currentLongitude);
  data += newLine + i + ' ' + randomCoord[0] + ' ' + randomCoord[1];
  newLine = '\n';
}

fs.writeFileSync(__dirname + '/dummyData.txt', data, 'utf8');
