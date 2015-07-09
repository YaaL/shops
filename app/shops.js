var Promise = require("bluebird"),
	mongoose = require('mongoose');
var Shop = require('./models/shop');

mongoose.connect('mongodb://localhost/shops');

var create = function(data) {
    var shop = new Shop();

    shop.name = data.name || 'A Coffee Shop';
    shop.address = data.address || 'Somewhere';

    return shop.save();
  };

var read = function(shopId) {
	if (typeof shopId === 'undefined'){
    	return Shop.find().exec();
	} else {
 		return Shop.findOne({ _id: shopId}).exec();
	}
  };

var update = function(shopId, data) {
    return read(shopId).then(function(shop){
      	shop.name = data.name || shop.name;
    	shop.address = data.address || shop.address;

	    return shop.save();
	});
};

var remove = function(shopId){
	return Shop.remove({
		_id: shopId
	}).exec();
};

module.exports = {
	create: create,
	read: read,
	update: update,
	remove: remove
};