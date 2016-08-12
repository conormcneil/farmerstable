var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  var user = {
    name: "Conor",
    isDope: true
  }
  res.json({token:jwt.sign(user,process.env.SECRET),user:user});
});

module.exports = router;
