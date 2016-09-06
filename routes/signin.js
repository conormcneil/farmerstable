var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

router.post('/', function(req, res, next) {
  knex('users')
    .where({
      username: req.body.username
    })
    .orWhere({email: req.body.username})
    .first()
    .then(user => {
      // TODO: bcrypt compare here:
      if (!user) return res.json({token: false, message: 'no user'});
      var match = bcrypt.compareSync(req.body.password,user.password);
      if (!match) return res.json({token: false, message: 'wrong password'});
      token = jwt.sign({user: user}, process.env.SECRET);
      res.json({token: token, user:user});
    })
    .catch(err => {
      console.log(err);
      res.json({token: false, message: 'knex error'});
    });
});

module.exports = router;
