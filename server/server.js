// Import all server dependencies
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

// Create an express application
var app = express();

// Mount middleware
app.use(bodyParser.json());
