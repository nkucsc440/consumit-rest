var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');

var ConsumableSchema = new Schema({
	url: String
	, _consumptions: [{ type:Schema.ObjectId, ref:'Consumption' }]
});

module.exports = mongoose.model('Consumable', ConsumableSchema);