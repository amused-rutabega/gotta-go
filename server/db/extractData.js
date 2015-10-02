/* This script parses the data in 'dummyData.txt' and 
 * stores them in the coords array, which is then exported 
 * to seed the database in db.js
 */

var fs = require('fs');
var coords = [];

var raw = fs.readFileSync(__dirname + '/dummyData.txt', 'utf8');
var lines = raw.split('\n');
for (var i = 0; i < lines.length; i += 1) {
  var line = lines[i];
  var data = line.split(' ');
  var latitude = parseFloat(data[1]);
  var longitude = parseFloat(data[2]);
  var coord = {latitude: latitude, longitude: longitude};
  coords.push(coord);
}

module.exports = coords;
