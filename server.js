import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import shops from './app/shops.js';

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Nothing to see here, move along.'));

app.route('/shops')
  .get((req, res) => shops.read().then(
    (data) => res.json(data),
    (err) => res.send(err),
  ))
  .post((req, res) => shops.create(req.body).then(
    (data) => res.json(data),
    (err) => res.send(err),
  ));

app.route('/shops/:shopId')
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

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => app.listen(port, () => console.log('Express server listening on port %s', port)));
