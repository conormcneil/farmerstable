var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


router.get('/', function(req, res, next) {
  res.send('respond with a farmer');
});

router.get('/farmers/:id', function(req, res, next) {
  knex('farms')
    .where({
      owner_id: req.params.id
    })
    .then(function(farms) {
      console.log("line 16",farms);
      res.send(farms);
    });
});

module.exports = router;
