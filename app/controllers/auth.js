var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BasicStrategy(
  function(username, password, callback) {
    console.log('authenticating...');
    console.log('finding user...');
    User.findOne({ username: username }, function(err, user) {
      if (err) { return callback(err); }

      if (!user) { return callback(null, false) }
      console.log('user found');

      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }

        if (!isMatch) { return callback(null, false) }

        console.log('password matched');
        return callback(null, user);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session: false });
