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

var port = process.env.PORT || 8080;

mongoose.connect('mongodb://consumit:consumit440@ds041821.mongolab.com:41821/consumit');

// all routes are prefixed with /api
app.use('/api', require('./app/routes/api'));

app.use(session({ secret: 'MAKETHISBETTER?'
				, resave: false
				, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
	function(username, password, done) {
		console.log('pw:' + password);
		User.findOne({username: username}, function( err, user) {
			if (err) { return done(err); }
			if (!user) {
			console.log(user);
				return done(null, false, {message: 'Incorrect username.' });
			}
			if (user.password != password) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	}
));
app.post('/login', passport.authenticate('local'
							, {
								successRedirect: '/'
							  , failureRedirect: '/login'
							  // , failureFlash: true
							})
);
passport.serializeUser(function(user, done){
	done(null, user._id);
});
User = require('./app/models/user');
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

// start server
app.listen(port);
console.log('Magic happens on port ' + port);