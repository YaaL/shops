var superagent = require('superagent'),
	expect = require('expect.js');

describe('Shops API', function(){
	var url = 'http://localhost:8080',
		shop = {
			name: "Test shop",
			address: "Test address"
		},
		shopId;

	describe('/shops', function(){

		it('retrieves list of shops', function(done){
		    superagent.get(url + '/shops')
				.end(function(e, res){
					expect(e).to.eql(null);
					expect(res.body).to.be.a('array');
					expect(res.body.length).to.be.above(0);
					expect(res.body[0]._id).to.be.a('string');
					done();
				});
	  	});

	  	it('creates a shop', function(done){
	  		superagent.post(url + '/shops').send(shop)
	  			.end(function(e, res){
					expect(e).to.eql(null);
					expect(res.body).to.be.a('object');
					expect(res.body.name).to.be(shop.name);
					shopId = res.body._id;
					done();
	  			});
	  	});
	});

	describe('/shops/:shopId', function(){
	  	it('retrieves a shop', function(done){
	  		superagent.get(url + '/shops/' + shopId)
	  			.end(function(e, res){
	  				expect(e).to.eql(null);
	  				expect(res.body).to.be.a('object');
	  				expect(res.body.name).to.be(shop.name);
	  				done();
	  			});
	  	});

	  	it("doesn't retrieve a nonexisting shop", function(done){
	  		superagent.get(url + '/shops/invalid')
	  			.end(function(e, res){
	  				expect(res.status).to.be(404);
	  				done();
	  			});
	  	});

	  	it("updates a shop", function(done){
	  		var updatedName = "Updated shop";
	  		superagent.put(url + '/shops/' + shopId).send({name: updatedName})
	  			.end(function(e, res){
	  				expect(e).to.eql(null);
	  				expect(res.body).to.be.a('object');
	  				expect(res.body.name).to.be(updatedName);
	  				done();
	  			});
	  	});
	  	it("deletes a shop", function(done){
	  		superagent.del(url + '/shops/' + shopId)
	  			.end(function(e, res){
	  				expect(e).to.eql(null);
	  				expect(res.status).to.be(200);
	  				done();
	  			});
	  	});
	});
});