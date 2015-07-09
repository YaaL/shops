var port = process.env.PORT || 8080;

var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var shops = require('./app/shops');

app.get('/', function(req, res, next) {
  res.send("Nothing to see here, move along.");
});

app.route('/shops')
  .get(function(req, res, next){
    shops.read().then(function(data){
      res.json(data);
    }, function(err){
      res.send(err);
    });
  })
  .post(function(req, res, next){
    shops.create(req.body).then(function(data){
      res.json(data);
    }, function(err){
      res.send(err);
    });
  });

app.route('/shops/:shopId')
  .get(function(req, res, next){
    shops.read(req.params.shopId).then(function(data){
      if (data){
        res.json(data);
      } else {
        res.status(404).send(new Error("Shop not found"));
      }
    }, function(err){
      res.status(404).send(new Error("Shop not found"));
    });
  })
  .put(function(req, res, next){
    shops.update(req.params.shopId, req.body).then(function(data){
      res.json(data);
    }, function(err){
      res.send(err);
    })
  })
  .delete(function(req, res, next){
    shops.remove(req.params.shopId).then(function(){
      res.status(200).send();
    }, function(err){
      res.send(err);
    });
  });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function (callback) {
  app.listen(port, function() {
    console.log('Express server listening on port %s', port);
  });
});
