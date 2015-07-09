var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ShopSchema = new Schema({
	name: String,
	address: String
});

module.exports = mongoose.model('Shop', ShopSchema);