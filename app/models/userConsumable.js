var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userConsumableSchema = new Schema({
	_consumer: { type: Schema.Types.ObjectId, ref: 'User' }
	, _consumable: { type: Schema.Types.ObjectId, ref: 'Consumable' }
	, consumeTime: Number
});

module.exports = mongoose.model('UserConsumable', userConsumableSchema);