var express = require('express');
var router = express.Router();
var api_key = 'key-59ece7f20db989826e21c581e8852198';
var domain = 'conorkingston.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

router.post('/send', function(req, res, next) {
  console.log(req.body);
  var data = {
    from: req.body.sendFrom,
    to: req.body.sendTo,
    subject: req.body.subject,
    text: req.body.body
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
});

module.exports = router;
