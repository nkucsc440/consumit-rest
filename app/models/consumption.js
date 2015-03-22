var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');

var consumptionSchema = new Schema({
	_consumer: { type: Schema.Types.ObjectId, ref: 'User', childPath: '_consumptions' }
	, _consumable: { type: Schema.Types.ObjectId, ref: 'Consumable', childPath: '_consumptions' }
	, consumeTime: Number
});

consumptionSchema.plugin(relationship, { relationshipPathName:'_consumer' });
consumptionSchema.plugin(relationship, { relationshipPathName:'_consumable' });

module.exports = mongoose.model('Consumption', consumptionSchema);