var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var knex = require('../db/knex');

router.post('/', function(req, res, next) {
  console.log('signin');
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

// router.post('/signin', (req, res) => {
//   knex('users')
//     .where({email: req.body.email})
//     .orWhere({username: req.body.email})
//     .first()
//     .then(user => {
//       // console.log("USER: ", user);
//       // If user doesn't exist, or password doesnt match, return false token.
//       if(!user) return res.json({token: false, message: "no user"});
//       if(!bcrypt.compareSync(req.body.password, user.password, 8)) return res.json({token: false, message: "wrong pw"});
//       // log user in with JWT
//       token = jwt.sign({user: user}, process.env.SECRET);
//       // console.log('user authorized: ', token);
//       res.json({token: token, user: user});
//     })
//     .catch(err => {
//       console.log(err);
//       res.json({token: false, message: "knex error"});
//     });
// });

module.exports = router;
