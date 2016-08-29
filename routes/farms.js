var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


router.get('/all', function(req, res, next) {
  knex('farms')
    .then(function(data) {
      res.json(data);
    });
});
router.post('/all', function(req, res, next) {
  var zipOrigin = req.body.zip;
  var origin = {
    lat: req.body.lat,
    lng: req.body.lng
  }
  knex('farms')
    .then(function(data) {
      var output = {};
      for (var i = 0; i < data.length; i++) {
        // add each farm to output object
        output[data[i].id] = data[i];
        // calculate distance from origin
        var distanceFromOrigin = Math.sqrt(Math.pow((data[i].lng - origin.lng),2) + Math.pow((data[i].lat - origin.lat),2));
        // attach to output object
        output[data[i].id]['distanceFromOrigin'] = distanceFromOrigin;
      };
      // sort output object into sorted array to respond to request
      var sortedArray = [];
      var keys = Object.keys(output);

      // sort happening here
      for (var i = 0; i < keys.length; i++) {
        if (sortedArray.length === 0) {
          sortedArray.push(output[keys[i]]);
        } else {
          for (var j = 0; j < sortedArray.length; j++) {
            if (output[keys[i]].distanceFromOrigin < sortedArray[j].distanceFromOrigin) {
              // insert object at this point in the array
              sortedArray.splice(j, 0, output[keys[i]]);
              j++;
            }
          }
          sortedArray.push(output[keys[i]]);
        }
      }
      // always return <10 results
      if (sortedArray.length > 10) {
        sortedArray.splice(10,sortedArray.length);
      };
      res.json(sortedArray);
    });
});

router.get('/details/:id', function(req, res, next) {
  knex('farms')
    .where({
      id: req.params.id
    })
    .first()
    .then(function(data) {
      res.json(data);
    });
});

router.get('/farmers/:id', function(req, res, next) {
  knex('farms')
    .where({
      owner_id: req.params.id
    })
    .then(function(farms) {
      res.send(farms);
    });
});

module.exports = router;
