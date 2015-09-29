/* this script parses data in 'dummyData.txt' and 
 * store them in coords, which is exported to seed the database
 */

var fs = require('fs');
var coords = [];

var raw = fs.readFileSync(__dirname + '/dummyData.txt', 'utf8');
var lines = raw.split('\n');
for (var i = 0; i < lines.length; i += 1) {
  var line = lines[i];
  var data = line.split(' ');
  var latitude = parseFloat(data[1]);
  var longitude = parseFloat(data[3]);
  var coord = {latitude: latitude, longitude: longitude};
  coords.push(coord);
};

module.exports = coords;
