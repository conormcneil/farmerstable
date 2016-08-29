var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


router.get('/all', function(req, res, next) {
  knex('farms')
    .then(function(data) {
      res.json(data);
    });
});
router.post('/all', function(req, res, next) {
  var zipOrigin = req.body.zip;
  console.log('zipOrigin',zipOrigin);
  knex('farms')
    .then(function(data) {
      console.log(data);
      res.json(data);
    });
});

router.get('/details/:id', function(req, res, next) {
  knex('farms')
    .where({
      id: req.params.id
    })
    .first()
    .then(function(data) {
      res.json(data);
    });
});

router.get('/farmers/:id', function(req, res, next) {
  knex('farms')
    .where({
      owner_id: req.params.id
    })
    .then(function(farms) {
      res.send(farms);
    });
});

module.exports = router;
