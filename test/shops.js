import { expect } from 'chai';

import shops from '../app/controllers/shops.js';

describe('Shops module', () => {
  const shop = {
    name: 'Test shop',
    address: 'Test address',
  };
  let shopId;

  it('should get all shops from db', (done) => {
    shops.read().then((data) => {
      expect(data).to.be.an('array');
      expect(data.length).to.be.above(0);
      shopId = data[0]._id;
      done();
    }, (e) => {
      expect(e).to.be.null;
      done();
    });
  });

  it('should create a shop', (done) => {
    shops.create(shop).then((data) => {
      expect(data).to.be.an('object');
      expect(data.name).to.equal(shop.name);
      done();
    }, (e) => {
      expect(e).to.be.null;
      done();
    });
  });

  it('should get a shop by id', (done) => {
    shops.read(shopId).then((data) => {
      expect(data).to.be.an('object');
      done();
    }, (e) => {
      expect(e).to.be.null;
      done();
    });
  });
});
