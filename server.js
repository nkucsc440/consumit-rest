var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

// bodyParser gets data POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Add this ------------------
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-AUTH-TOKEN, X-API-VERSION');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
};
//----------------------------
// app.use(cookieParser());
app.use(allowCrossDomain); //Add this
// app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 8080;

mongoose.connect('mongodb://consumit:consumit440@ds041821.mongolab.com:41821/consumit');

app.use(passport.initialize());
app.all('*', authenticateUser);

function authenticateUser(req, res, next) {
  var _ = require('underscore')
  ,   nonSecurePaths = ['/', '/login'];

  if (_.contains(nonSecurePaths, req.path) ) return next();

  var authController = require('./app/controllers/auth');
  authController.isAuthenticated(req, res, next);
  next();
}

// all routes are prefixed with /api
app.use('/api', require('./app/routes/api'));

// app.use(session({ secret: 'MAKETHISBETTER?'
// 				, resave: false
// 				, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());

// start server
app.listen(port);
console.log('Magic happens on port ' + port);
