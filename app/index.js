'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var errorhandler = require('errorhandler');
var cors = require('cors');
var root = process.cwd();

// Application
var app = express();

app.set('views', './app/views');
app.set('view engine', 'jade');

app.use(favicon(path.join(root, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(root, 'public')));

if (app.get('env') === 'development') {
  var bowerPath = path.join(root, 'bower_components');
  app.use('/bower_components', express.static(bowerPath));
  app.use(morgan('dev'));
  app.use(errorhandler());
}

// Global variables
app.locals.moment = require('moment');
app.locals.prune = require('underscore.string/prune');

// Routes
require(root + '/app/routes/projects')(app); // About page
require(root + '/app/routes/about')(app); // About page
// require(root + '/app/routes/blog')(app); // Blog page
require(root + '/app/routes/contact')(app); // Contact mail

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('The content requested hasn\'t been found.');
  err.status = 404;
  next(err);
});

// Error handlers
// Development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('errors/index', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('errors/index', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
