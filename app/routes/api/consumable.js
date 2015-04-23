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
	Consumable.findById(id)
		.populate({ path: '_consumptions' })
		.exec(function(err, consumableUnpopulated) {
			if (err) { res.send(err); }
			Consumable.populate(consumableUnpopulated
				, { path: '_consumptions._user', model: 'User' }
				, function(err, consumablePopulated) {
					res.json({ consumable: consumablePopulated });
				}
			);
		});
};

module.exports.updateConsumable = function(req, res, id) {
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

module.exports.getTopConsumables = function(req, res, n) {
	Consumable
		.find()
		.sort({'consumedCount': -1})
		.limit(n)
		.exec(function(err, consumables) {
			if (err) { res.send(err); }
			res.json({ consumables: consumables });
		});
};

module.exports.updateAverageConsumeTime = function(req, res, id) {
	var Consumption = require('../../models/consumption');
	Consumption
		.aggregate(
			[
				{ $match: {
						_consumable: id
				}}
				, { $group: {
						_id: '$_consumable'
					, avgConsumeTime: { $avg: '$consumeTime' }
				}}
			]
			, function(err, results) {
					if (err) { console.error(err); }
					else {
						console.log('averageConsumeTime: ' + results[0].avgConsumeTime);
						Consumable.update({ _id: id }, { averageConsumeTime: results[0].avgConsumeTime }, function(err, numAffected, raw) {
							if (err) { console.error(err); }
							else {
							  // console.log('The number of updated documents was %d', numberAffected);
							  console.log('The raw response from Mongo was ', raw);
							}
						});
						// Consumable.findByIdAndUpdate(id, { $set: { averageConsumeTime: avgConsumeTime }}, function(err, consumable) {
						// 	if (err) { console.error(err); }
						// });
					}
				}
		);
};

module.exports.updateConsumeCount = function(req, res, id) {
	var Consumption = require('../../models/consumption');
	Consumption.count({ _consumable: id, consumed: true }, function(err, c) {
		if (err) { console.error(err); }
		else {
			console.log('count: ' + c);
			Consumable.update({ _id: id }, { consumedCount: c }, function(err, numAffected, raw) {
				if (err) { console.error(err); }
				else {
					// console.log('The number of updated documents was %d', numberAffected);
					console.log('The raw response from Mongo was ', raw);
				}
			});
			// Consumable.findByIdAndUpdate(id, { $set: { consumedCount: c }}, function(err, consumable) {
			// 	if (err) { console.error(err); }
			// });
		}
	});
};
