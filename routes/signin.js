var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var knex = require('../db/knex');

router.post('/', function(req, res, next) {
  knex('users')
    .where({
      username: req.body.username
    })
    .first()
    .then(function(user) {
      if (user.password === req.body.password) {
        res.json({token:jwt.sign(user,process.env.SECRET),user:user});
      }
      // TODO: bcrypt compare here:
      // if password match: res.json
      // else return error >> incorrect password
    });
});

module.exports = router;
