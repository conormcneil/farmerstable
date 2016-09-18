var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('users')
    .then(function(users) {
      res.json(users);
    });
});

router.post('/new', function(req, res, next) {
  var passwordHS = bcrypt.hashSync(req.body.password,8);
  knex('users')
    .insert({
      email: req.body.email,
      username: req.body.username,
      password: passwordHS,
      isFarmer: req.body.isFarmer
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
