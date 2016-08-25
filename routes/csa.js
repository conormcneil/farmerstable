var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('csas')
    .then(function(data) {
      res.json(data);
    });
});

router.get('/:id', function(req, res, next) {
  knex('csas')
    .where({
      id: req.params.id
    })
    .first()
    .then(function(data) {
      res.json(data);
    });
});

// router.post('/new', function() {
//   knex('csas')
// }

module.exports = router;
