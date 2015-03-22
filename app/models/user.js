var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');

var UserSchema = new Schema({
	email: String
	, username: String
	, chromeExtensionId: String
	, password: String
	, firstName: String
	, lastName: String
	, _consumables: [{ type:Schema.ObjectId, ref:'UserConsumable' }]
});

module.exports = mongoose.model('User', UserSchema);