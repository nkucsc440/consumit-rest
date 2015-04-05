var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');

var ConsumptionSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    childPath: '_consumptions'
  },
  _consumable: {
    type: Schema.Types.ObjectId,
    ref: 'Consumable',
    childPath: '_consumptions'
  },
  consumeTime: Number,
  consumed: {
    type: Boolean,
    default: false
  }
});

ConsumptionSchema.plugin(relationship, {
  relationshipPathName: '_user'
});
ConsumptionSchema.plugin(relationship, {
  relationshipPathName: '_consumable'
});

module.exports = mongoose.model('Consumption', ConsumptionSchema);
