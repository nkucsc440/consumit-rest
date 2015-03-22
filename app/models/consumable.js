var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');

var ConsumableSchema = new Schema({
	url: String
	, _users: [{ type:Schema.ObjectId, ref:'UserConsumable' }]
});

module.exports = mongoose.model('Consumable', ConsumableSchema);