var express = require('express');
var router = express.Router();
var auth = require('../../app/controllers/auth');

router.use(function(req, res, next) {
    // log each request
    console.log('API Request: ' + req.method + ' ' + req.url);
    next();
});


var User = require('../models/user');

router.route('/me')
  .get(auth.isAuthenticated, function(req, res) {

    User.findById(req.user._id)
      .select('_id _consumptions')
      .populate({ path: '_consumptions', model: 'Consumption', match: { consumed: false }, select: '_id _consumable consumeTime' })
  		.exec(function(err, userUnpopulated) {
  			if (err) { res.send(err); }
  			User.populate(userUnpopulated
                    , { path: '_consumptions._consumable'
                      , model: 'Consumable'
                      , select: '_id url'}
                      , function(err, userPopulated) {
                          res.json({ user: userPopulated });
                        });
  		});
  })
;

router.route('/auth')
  .get(auth.isAuthenticated, function(req, res) { res.json({ authenticated: true }); })
;

router.route('/')
    .get(function(req, res){ res.send('API docs') })
;

var UserRoutes = require('./api/user');

router.route('/users')
    .post(function(req, res) { UserRoutes.addUser(req, res) })
    .get(auth.isAuthenticated, function(req, res) { UserRoutes.getAllUsers(req, res) })
;
router.route('/users/:id')
    .get(auth.isAuthenticated, function(req, res) { UserRoutes.getSingleUser(req, res, req.params.id) })
    .put(auth.isAuthenticated, function(req, res) { UserRoutes.updateUser(req, res, req.params.id) })
    .delete(auth.isAuthenticated, function(req, res) { UserRoutes.deleteUser(req, res, req.params.id) })
;

var ConsumableRoutes = require('./api/consumable');

router.route('/consumables')
    .post(auth.isAuthenticated, function(req, res) { ConsumableRoutes.addConsumable(req, res) })
    .get(auth.isAuthenticated, function(req, res) { ConsumableRoutes.getAllConsumables(req, res) })
;
router.route('/consumables/:id')
    .get(function(req, res) { ConsumableRoutes.getSingleConsumable(req, res, req.params.id) })
    // .put(function(req, res) { ConsumableRoutes.updateConsumable(req, res, req.params.id) })
    // .delete(function(req, res) { ConsumableRoutes.deleteConsumable(req, res, req.params.id) })
;

var ConsumptionRoutes = require('./api/consumption');

router.route('/consumptions')
    .post(auth.isAuthenticated, function(req, res) { ConsumptionRoutes.addConsumption(req, res) })
    .get(auth.isAuthenticated, function(req, res) { ConsumptionRoutes.getAllConsumptions(req, res) })
;
router.route('/consumptions/:id')
    .get(function(req, res) { ConsumptionRoutes.getSingleConsumption(req, res, req.params.id) })
    .put(auth.isAuthenticated, function(req, res) { ConsumptionRoutes.updateConsumption(req, res, req.params.id) })
    .delete(auth.isAuthenticated, function(req, res) { ConsumptionRoutes.deleteConsumption(req, res, req.params.id) })
;

module.exports = router;
