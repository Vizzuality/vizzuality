'use strict';

var _ = require('underscore');
var express    = require('express');
var bodyParser = require('body-parser');
var path       = require('path');
var moment     = require('moment');
var root       = process.cwd();
var file       = require(root + '/app/lib/file');

var app = express();

app.set('views', './app/views');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express['static'](path.join(root, 'public')));
app.use('/bower_components', express['static'](path.join(root, 'bower_components')));

function pageNotFound(req, res) {
  res.render('errors/404');
}

app.get('/', function(req, res) {
  var projectsPath = root + '/content/projects';
  return file.getFiles(projectsPath, function(err, data) {
    if (err) {
      return pageNotFound(req, res);
    }
    res.render('projects/index', {
      projects: _.sortBy(data, function(d) {
        return (d.order || 0) + moment(d.date, 'YYYY-MM-DD').valueOf();
      }),
      className: 'is-project-page'
    });
  });
});

app.get('/projects', function(req, res) {
  res.redirect('/');
});

app.get('/projects/:project', function(req, res) {
  var filePath = './content/projects/' + req.params.project + '.md';
  return file.getData(filePath, function(err, result) {
    if (err) {
      return pageNotFound(req, res);
    }
    res.render('projects/show', {
      data: result.data,
      content: result.html,
      className: 'is-project-detail-page'
    });
  });
});

app.get('/about', function(req, res) {
  var teamPath = root + '/content/team';
  file.getFiles(teamPath, function(err, data) {
    if (err) {
      return pageNotFound(req, res);
    }
    res.render('about/index', {
      team: _.sortBy(data, function(d) {
        return (d.order || 0) + moment(d.date, 'YYYY-MM-DD').valueOf();
      }),
      className: 'is-about-page'
    });
  });
});

app.get('/about/:member', function(req, res) {
  var filePath = './content/team/' + req.params.member + '.md';
  file.getData(filePath, function(err, result) {
    if (err) {
      return pageNotFound(req, res);
    }
    res.render('team/show', {
      data: result.data,
      content: result.html,
      className: 'is-team-page'
    });
  });
});

module.exports = app;
