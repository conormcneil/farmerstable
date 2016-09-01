var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET users listing. */
router.get('/all', function(req, res, next) {
  knex('csas')
    .then(function(data) {
      res.json(data);
    });
});

router.get('/details/:id', function(req, res, next) {
  knex('csas')
    .where({
      farm_id: req.params.id
    })
    .first()
    .then(function(data) {
      res.json(data);
    });
});

router.get('/user/:id', function(req, res, next) {
  knex('users_csas')
    .where({
      user_id: req.params.id
    })
    // ^^^ takes care of altering users_csas table:
    // now join here?
    .innerJoin('csas','users_csas.csa_id','csas.id')
    .then(function(data) {
      // console.log(data); // data is array of csa_ids
      res.json(data);
    });
});

module.exports = router;
