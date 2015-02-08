var UserConsumable = require('../../models/userConsumable');

module.exports.addUserConsumable = function(req, res) {
	var userConsumable = new UserConsumable(req.body.userConsumable);
	userConsumable.save(function(err) {
		if (err) { res.send(err); }
		res.json({ userConsumable: userConsumable });
	});
};

module.exports.getAllUserConsumables = function(req, res) {
	UserConsumable.find()
		.populate('_consumer _consumable')
		.exec(function(err, userConsumables) {
		if (err) { res.send(err); }
		res.json({ userConsumables: userConsumables });
	});
};

module.exports.getSingleUserConsumable = function(req, res, id) {
	UserConsumable.findById(id)
		.populate('_consumer _consumable')
		.exec(function(err, userConsumable) {
			if (err) { res.send(err); }
			res.json({ userConsumable: userConsumable });
		});
};

module.exports.udpateUserConsumable = function(req, res, id) {
	UserConsumable.findByIdAndUpdate(id, {$set: req.body.userConsumable}, function(err, userConsumable) {
		if (err) { res.send(err); }
		res.json({ userConsumable: userConsumable });
	});
};

module.exports.deleteUserConsumable = function(req, res, id) {
	UserConsumable.findByIdAndRemove(id, function(err) {
		if (err) { res.send(err); }
		res.send(200);
	});
};