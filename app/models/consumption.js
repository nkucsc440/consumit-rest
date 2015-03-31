var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');

var consumptionSchema = new Schema({
	_user: { type: Schema.Types.ObjectId, ref: 'User', childPath: '_consumptions' }
	, _consumable: { type: Schema.Types.ObjectId, ref: 'Consumable', childPath: '_consumptions' }
	, consumeTime: Number
	, consumed: Boolean
});

consumptionSchema.plugin(relationship, { relationshipPathName:'_user' });
consumptionSchema.plugin(relationship, { relationshipPathName:'_consumable' });

module.exports = mongoose.model('Consumption', consumptionSchema);