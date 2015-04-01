var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BasicStrategy(
  function(username, password, callback) {
    User.findOne({ username: username }, function(err, user) {
      console.log('finding user with username='+username+'...');
      if (err) { return callback(err); }

      if (!user) { return callback(null, false) }

      console.log('found user with username='+username);

      user.verifyPassword(password, function(err, isMatch) {
        console.log('verifying password...');
        if (err) { return callback(err); }

        if (!isMatch) { return callback(null, false) }
        console.log('password verified');
        return callback(null, user);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session: false });
