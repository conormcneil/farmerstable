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
  if (req.body) {
    var zipOrigin = req.body.zip;
    var origin = {
      lat: req.body.lat,
      lng: req.body.lng
    }
  }
  knex('farms')
    .then(function(data) {
      var output = [];
      if (origin.lat && origin.lng) {
        console.log('these exist:',origin.lat,origin.lng);
      }
      for (var i = 0; i < data.length; i++) {
        // add each farm to output array
        output.push(data[i]);
        // calculate distance from origin
        var distanceFromOrigin = Math.sqrt(Math.pow((data[i].lng - origin.lng),2) + Math.pow((data[i].lat - origin.lat),2));
        // attach to output array
        data[i]['distanceFromOrigin'] = distanceFromOrigin;
      };
      function getMax(arr) {
        if (arr.length === 0) {
          return false;
        }
        var max = -Infinity;
        var indexOfMax = -1;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i]['distanceFromOrigin'] > max) {
            max = arr[i]['distanceFromOrigin'];
            indexOfMax = i;
          }
        }
        return indexOfMax;
      }
      var finalSort = [];
      function sortFarms(arr) {
        if (arr.length === 0) {
          return finalSort;
        }
        var indexOfMax = getMax(arr);
        finalSort.unshift(arr.splice(indexOfMax,1)[0]);
        return sortFarms(arr);
      }
      res.json(sortFarms(output));
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

router.post('/posts/:id', function(req, res, next) {
  knex('farm_posts')
    .where({
      farm_id: req.params.id
    })
    .then(function(data) {
      res.json(data);
    });
});

router.post('/newpost',function(req, res, next) {
  console.log(req.body);
  knex('farm_posts')
    .insert({
      farm_id: req.body.farm_id,
      // sent_to: req.body.sent_to,
      subject: req.body.subject,
      body: req.body.body,
      date: Date.now().toString()
    })
    .then(function(data) {
      res.json(data);
    });
});

router.delete('/deletepost/:id',function(req, res, next) {
  knex('farm_posts')
    .delete()
    .where({
      id: req.params.id
    })
    .then(function(data) {
      res.json('deleted');
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

// get farms being followed by user_id
router.get('/following/users/:id', function(req, res, next) {
  knex('farms_followers')
    .where({
      user_id: req.params.id
    })
    .then(function(data) {
      res.json(data);
    });
});

module.exports = router;
