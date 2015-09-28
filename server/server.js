// Import all server dependencies
var express = require('express');

// Import all middleware
var morgan = require('morgan');
var bodyParser = require('body-parser');

// Import our helpers
var toilets = require('./toilets.js');

// Create an express application
var app = express();

// Set the port
app.set('port', process.env.PORT || 8080);

// Mount middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(function (req, res, next) {
  if (process.env.NODE_ENV === 'production' && req.url === '/config.js') {
    res.set('Content-Type', 'text/javascript');
    res.send('var GOOGLE_API_KEY = ' + process.env.GOOGLE_KEY + ';');
  } else {
    next();
  }
});

// Serve client files
app.use(express.static(__dirname + '/../client'));

// Serve app page
app.get('/', function (req, res) {
  res.status(200).sendFile('./client/index.html');
});

app.get('/api/toilets', function (req, res) {
  toilets.getToilets(req, function (data) {
    res.json(data);
  });
});

app.post('/api/toilets', function (req, res) {
  toilets.addToilet(req, function (success, message) {
    if (success) {
      res.status(201).json({ message: message });
    } else {
      res.status(400).json({ message: message });
    }
  });
});


app.put('/api/toilets/:id', function (req, res) {
  toilets.updateToilet(req, function (success, message) {
    if (success) {
      res.status(201).json({ message: message });
    } else {
      res.status(400).json({ message: message });
    }
  });
});

var server = app.listen(app.get('port'), function () {
  var port = server.address().port;
  console.log('listening on port ' + port);
});

module.exports = server;
