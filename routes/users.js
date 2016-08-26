var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('users')
    .then(function(users) {
      res.json(users);
    });
});

router.post('/new', function(req, res, next) {
  knex('users')
    .insert({
      username: req.body.username,
      password: req.body.password
    })
    .then(function(data) {
      res.json(data);
    });
});

router.get('/user/:id', function(req, res, next) {
  knex('users')
    .where({
      id: req.params.id
    })
    .then(function(users) {
      res.json(users);
    });
});

module.exports = router;
