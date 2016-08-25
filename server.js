require('dotenv').config();
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bearerToken = require('express-bearer-token');

var csa = require('./routes/csa');
var signin = require('./routes/signin');
var users = require('./routes/users');
var farms = require('./routes/farms');
var app = express();

app.use(bearerToken());
app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/csa', csa);
app.use('/signin', signin);
app.use('/users', users);
app.use('/farms', farms);

// redirect from # to remove from URL
app.get('*',function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

app.use(function(req, res, next) {
  jwt.verify(req.token, process.env.SECRET, function(err, decoded) {
    if (!err) {
      next();
    } else {
      // TODO
      res.status(400).send("Stupid Question")
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
  // TODO
  res.send('you fucked up');
});


module.exports = app;
