var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// bodyParser gets data POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

mongoose.connect('mongodb://consumit:consumit440@ds041821.mongolab.com:41821/consumit');

// all routes are prefixed with /api
app.use('/api', require('./app/routes/api'));

// start server
app.listen(port);