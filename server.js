import express from 'express';
import bodyParser from 'body-parser';

import db from './db.js';
import routes from './app/routes.js';

const { APP_PORT } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Nothing to see here, move along.'));

app.use('/shops', routes);

db.connection.on('error', (error) => console.log('Connection error:', error));
db.connection.once('open', () => app.listen(APP_PORT, () => console.log('Express server listening on port %s', APP_PORT)));
