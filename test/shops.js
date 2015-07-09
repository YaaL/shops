var expect = require('expect.js');

var shops = require('../app/shops');

describe('Shops module', function(){
	var shop = {
			name: "Test shop",
			address: "Test address"
		},
		shopId;

	it('should get all shops from db', function(done){
		shops.read().then(function(data){
			expect(data).to.be.a('array');
			expect(data.length).to.be.above(0);
			shopId = data[0]._id;
			done();
		}, function(e){
			expect(e).to.be(null);
			done();
		});
	});

	it('should create a shop', function(done){

		shops.create(shop).then(function(data){
			expect(data).to.be.a('object');
			expect(data.name).to.be(shop.name);
			done();
		}, function(e){
			expect(e).to.be(null);
			done();
		})
	});

	it('should get a shop by id', function(done){
		shops.read(shopId).then(function(data){
			expect(data).to.be.a('object');
			done();
		}, function(e){
			expect(e).to.be(null);
			done();
		});
	});
});