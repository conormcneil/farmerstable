var express = require('express');
var router = express.Router();
var api_key = 'key-59ece7f20db989826e21c581e8852198';
var domain = 'conorkingston.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

router.post('/send', function(req, res, next) {
  var data = {
    from: 'Yo Face <conor@conorkingston.com>',
    to: 'cmkingston21@me.com',
    subject: 'This is a test',
    text: 'Testing some Mailgun awesomness on your face!!'
  };

  mailgun.messages().send(data, function (error, body) {
    res.send(body);
  });
});

module.exports = router;
