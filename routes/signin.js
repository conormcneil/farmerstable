var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var knex = require('../db/knex');

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
      if (user.password !== req.body.password) return res.json({token: false, message: 'wrong password'});

      token = jwt.sign({user: user}, process.env.SECRET);
      res.json({token: token, user:user});
      // if password match: res.json
      // else return error >> incorrect password
    })
    .catch(err => {
      console.log(err);
      res.json({token: false, message: 'knex error'});
    });
});

module.exports = router;
