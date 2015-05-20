'use strict';

// var _ = require('underscore');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var errorhandler = require('errorhandler');
var root = process.cwd();
// var file = require(root + '/app/helpers/file');

// Application
var app = express();
// var isProduction = (app.get('env') === 'production');

app.set('views', './app/views');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express['static'](path.join(root, 'public')));

if (app.get('env') === 'development') {
  app.use('/bower_components', express['static'](path.join(root, 'bower_components')));
  app.use(morgan('dev'));
  app.use(errorhandler());
}

// Routes
require(root + '/app/routes/projects')(app); // About page
require(root + '/app/routes/about')(app); // About page
require(root + '/app/routes/contact')(app); // Contact mail

module.exports = app;
