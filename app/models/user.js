var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	email: String
	, username: String
	, chromeExtensionId: String
	, password: String
	, firstName: String
	, lastName: String
	, _consumptions: [{ type:Schema.ObjectId, ref:'Consumption' }]
});

UserSchema.pre('save', function(callback) {
	var user = this;

	if (!user.isModified('password')) return callback();

	bcrypt.genSalt(5, function(err, salt) {
		if (err) return callback(err);
		 bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) return callback(err);
			user.password = hash;
			callback();
		});
	});
});

UserSchema.methods.verifyPassword = function(password, callback) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		if (err) return callback(err);
		callback(null, isMatch);
	});
};

module.exports = mongoose.model('User', UserSchema);
