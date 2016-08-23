var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


router.get('/all', function(req, res, next) {
  knex('farms')
    .then(function(data) {
      res.json(data);
    })
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
