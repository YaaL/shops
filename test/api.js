import superagent from 'superagent';

import { expect } from 'chai';

describe('Shops API', () => {
  const url = 'http://localhost:8080';
  const shop = {
    name: 'Test shop',
    address: 'Test address',
  };
  const updatedName = 'Updated shop';
  let shopId;

  describe('/shops', () => {
    it('retrieves list of shops', (done) => {
      superagent.get(`${url}/shops`)
        .end((e, res) => {
          expect(e).to.be.null;
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.above(0);
          expect(res.body[0]._id).to.be.a('string');
          done();
        });
    });

    it('creates a shop', (done) => {
      superagent.post(`${url}/shops`).send(shop)
        .end((e, res) => {
          expect(e).to.be.null;
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal(shop.name);
          expect(res.body.address).to.equal(shop.address);
          shopId = res.body._id;
          done();
        });
    });
  });

  describe('/shops/:shopId', () => {
    it('retrieves a shop', (done) => {
      superagent.get(`${url}/shops/${shopId}`)
        .end((e, res) => {
          expect(e).to.be.null;
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal(shop.name);
          done();
        });
    });

    it("doesn't retrieve a non-existing shop", (done) => {
      superagent.get(`${url}/shops/invalid`)
        .end((e, res) => {
          expect(e).to.be.an('error');
          expect(e.status).to.equal(404);
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('updates a shop', (done) => {
      superagent.put(`${url}/shops/${shopId}`).send({ name: updatedName })
        .end((e, res) => {
          expect(e).to.be.null;
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal(updatedName);
          expect(res.body.address).to.equal(shop.address);
          done();
        });
    });
    it('deletes a shop', (done) => {
      superagent.del(`${url}/shops/${shopId}`)
        .end((e, res) => {
          expect(e).to.be.null;
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
