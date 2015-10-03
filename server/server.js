// Import all server dependencies
var express = require('express');

// Import all middleware
var morgan = require('morgan');
var bodyParser = require('body-parser');

// Import our helpers
var toilets = require('./toilets.js');

// Geolocator based on ip address
var geoip = require('geoip-lite');

// Create an express application
var app = express();

// Set the port
app.set('port', process.env.PORT || 8080);

app.enable('trust proxy');

// Use ejs for basic templating
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

var db = require('./db/db');

// Before the server can handle any requests it must first sync the database.
// This middleware ensures that the database has been synced before handling the
// request
var synced = false;
app.use(function (req, res, next) {
  if (!synced) {
    db.sync().then(function () {
      synced = true;

      next();
    });
  } else {
    next();
  }
});

// Mount middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(function (req, res, next) {
  if (process.env.NODE_ENV === 'production' && req.url === '/config.js') {
    res.set('Content-Type', 'text/javascript');
    res.send('var GOOGLE_API_KEY = "' + process.env.GOOGLE_KEY + '";');
  } else {
    next();
  }
});

// Serve client files
app.use(express.static(__dirname + '/../client'));

// Serve app page
app.get('/', function (req, res) {
  res.status(200).render('index', {secure: req.secure});
});

app.get('/location.js', function (req, res) {
  res.set('Content-Type', 'text/javascript');

  res.status(200).send('var GEO_DATA = ' + JSON.stringify(geoip.lookup(req.ip)) + ';');
});

app.get('/api/toilets', function (req, res) {
  toilets.getToilets(req, function (data) {
    res.json(data);
  });
});

app.post('/api/toilets', function (req, res) {
  toilets.addToilet(req, function (success, message, data) {
    if (success) {
      res.status(201).json({ message: message, toilet: data });
    } else {
      res.status(400).json({ message: message });
    }
  });
});


app.put('/api/toilets/:id', function (req, res) {
  toilets.updateToilet(req, function (success, message, data) {
    if (success) {
      res.status(201).json({ message: message, toilet: data });
    } else {
      res.status(400).json({ message: message });
    }
  });
});

// 404 Handler
app.use(function (req, res) {
  res.status(200).render('index', {secure: req.secure});
});

var server = app.listen(app.get('port'), function () {
  var port = server.address().port;
  console.log('listening on port ' + port);
});

module.exports = server;
