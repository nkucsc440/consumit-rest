var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConsumableSchema = new Schema({
	url: String
});

module.exports = mongoose.model('Consumable', ConsumableSchema);