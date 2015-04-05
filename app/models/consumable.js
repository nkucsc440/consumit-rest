var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');
var findOrCreate = require('mongoose-findorcreate')

var ConsumableSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  _consumptions: [{
    type: Schema.ObjectId,
    ref: 'Consumption'
  }],
  consumedCount: {
    type: Number
  },
  averageConsumeTime: {
    type: Number
  }
});

ConsumableSchema.plugin(findOrCreate);

module.exports = mongoose.model('Consumable', ConsumableSchema);
