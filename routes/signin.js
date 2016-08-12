var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  console.log('signin');
  var user = {
    name: "Conor",
    isDope: true
  }
  console.log(user);
  console.log(jwt.sign(user,process.env.SECRET));
  res.json({token:jwt.sign(user,process.env.SECRET)});
});
// router.get('/signin', function(req, res, next) {
//   console.log('signin2');
//   var user = {
//     name: "Conor",
//     isDope: true
//   }
//   console.log(user);
//   var token = {token:jwt.sign(user,process.env.SECRET)};
//   console.log("token", token);
//   res.json(token);
// });

module.exports = router;
