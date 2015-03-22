var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');

var userConsumableSchema = new Schema({
	_consumer: { type: Schema.Types.ObjectId, ref: 'User', childPath: '_consumables' }
	, _consumable: { type: Schema.Types.ObjectId, ref: 'Consumable', childPath: '_users' }
	, consumeTime: Number
});

userConsumableSchema.plugin(relationship, { relationshipPathName:'_consumer' });
userConsumableSchema.plugin(relationship, { relationshipPathName:'_consumable' });

module.exports = mongoose.model('UserConsumable', userConsumableSchema);