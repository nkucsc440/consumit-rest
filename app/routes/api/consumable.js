var Consumable = require('../../models/consumable');

module.exports.addConsumable = function(req, res) {
	var consumable = new Consumable(req.body.consumable);
	consumable.save(function(err) {
		if (err) { res.send(err); }
		res.json({ consumable: consumable });
	});
};

module.exports.getAllConsumables = function(req, res) {
	Consumable.find(function(err, consumables) {
		if (err) { res.send(err); }
		res.json({ consumables: consumables });
	});
};

module.exports.getSingleConsumable = function(req, res, id) {
	Consumable.findById(id, function(err, consumable) {
		if (err) { res.send(err); }
		res.json({ consumable: consumable });
	});
};

module.exports.udpateConsumable = function(req, res, id) {
	Consumable.findByIdAndUpdate(id, {$set: req.body.consumable}, function(err, consumable) {
		if (err) { res.send(err); }
		res.json({ consumable: consumable });
	});
};

module.exports.deleteConsumable = function(req, res, id) {
	Consumable.findByIdAndRemove(id, function(err) {
		if (err) { res.send(err); }
		res.send(200);
	});
};