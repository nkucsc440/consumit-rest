var User = require('../../models/user');

module.exports.addUser = function(req, res) {
	var user = new User(req.body.user);
	user.save(function(err) {
		if (err) { res.send(err); }
		res.json({ user: user });
	});
};

module.exports.getAllUsers = function(req, res) {
	User.find(function(err, users) {
		if (err) { res.send(err); }
		res.json({ users: users });
	});
};

module.exports.getSingleUser = function(req, res, id) {
	User.findById(id)
		.populate({ path: '_consumptions' })
		.exec(function(err, userUnpopulated) {
			if (err) { res.send(err); }
			User.populate(userUnpopulated
				, { path: '_consumptions._consumable', model: 'Consumable'}
				, function (err, userPopulated) {
					res.json({ user: userPopulated });
				}
			);
		});
};

module.exports.updateUser = function(req, res, id) {
	User.findByIdAndUpdate(id, {$set: req.body.user}, function(err, user) {
		if (err) { res.send(err); }
		res.json({ user: user });
	});
};

module.exports.deleteUser = function(req, res, id) {
	User.findByIdAndRemove(id, function(err) {
		if (err) { res.send(err); }
		res.send(200);
	});
};