var express = require('express');
var router = express.Router();
var api_key = 'key-59ece7f20db989826e21c581e8852198';
var domain = 'conorkingston.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

router.post('/send', function(req, res, next) {
  if (typeof req.body.sendTo === 'string') {
    var data = {
      from: req.body.sendFrom,
      to: req.body.sendTo,
      subject: "Farmer's Table: " + req.body.subject,
      text: req.body.body
    };
    mailgun.messages().send(data, function (error, body) {
      res.json('success');
    });
  } else {
    var count = 0;
    req.body.sendTo.map(function(e) {
      count++;
      var data = {
        from: req.body.sendFrom,
        to: e,
        subject: "Farmer's Table: " + req.body.subject,
        text: req.body.body
      };
      mailgun.messages().send(data, function (error, body) {
        if (count === req.body.sendTo.length) {
          // console.log('all messages sent');
          res.json('success all');
        }
        console.log('message sent to: ' + e);
      });
    });
  };
});

module.exports = router;
