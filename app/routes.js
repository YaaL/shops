import express from 'express';
import shops from './controllers/shops.js';

const router = express.Router();

router.route('/')
  .get((req, res) => shops.read().then(
    (data) => res.json(data),
    (err) => res.send(err),
  ))
  .post((req, res) => shops.create(req.body).then(
    (data) => res.json(data),
    (err) => res.send(err),
  ));

router.route('/:shopId')
  .get((req, res) => {
    shops.read(req.params.shopId).then(
      (data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(404).send(new Error('Shop not found'));
        }
      },
      () => res.status(404).send(new Error('Shop not found')),
    );
  })
  .put((req, res) => shops.update(req.params.shopId, req.body).then(
    (data) => res.json(data),
    (err) => res.send(err),
  ))
  .delete((req, res) => shops.remove(req.params.shopId).then(
    () => res.status(200).send(),
    (err) => res.send(err),
  ));

export default router;
