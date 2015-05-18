'use strict';

var _ = require('underscore');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var errorhandler = require('errorhandler');
var nodemailer = require('nodemailer');
var root = process.cwd();
var file = require(root + '/app/lib/file');

// Application
var app = express();
var isProduction = (app.get('env') === 'production');

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

// Mailer
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Router
function pageNotFound(req, res) {
  res.render('errors/404');
}

// Home and projects page
app.get('/', function(req, res) {
  var projectsPath = root + '/content/projects';
  var t = Math.pow(10, 15);

  file.getFiles(projectsPath, isProduction, function(err, data) {
    if (err) {
      return pageNotFound(req, res);
    }
    res.render('projects/index', {
      projects: _.sortBy(_.where(data, { highlighted: true }), function(d) {
        var time = new Date(d.date).valueOf();
        var order = d.order ? parseInt(d.order) : 0;
        return (order * t) + time;
      }),
      className: 'is-project-page'
    });
  });
});

app.get('/projects', function(req, res) {
  res.redirect('/');
});

// Project detail page
app.get('/projects/:project', function(req, res) {
  var projectsPath = root + '/content/projects';
  var t = Math.pow(10, 15);

  file.getFiles(projectsPath, isProduction, function(err, projects) {
    var result, index;

    projects = _.sortBy(_.where(projects, { highlighted: true }), function(d) {
      var time = new Date(d.date).valueOf();
      var order = d.order ? parseInt(d.order) : 0;
      return (order * t) + time;
    });

    _.each(projects, function(project, i) {
      if (project.slug === req.params.project) {
        result = project;
        index = i;
      }
    });

    res.render('projects/show', {
      data: result,
      next: projects[index + 1],
      content: result.html,
      className: 'is-project-detail-page'
    });

  });
});

// About page
app.get('/about', function(req, res) {
  var teamPath = root + '/content/team';
  file.getFiles(teamPath, isProduction, function(err, data) {
    if (err) {
      return pageNotFound(req, res);
    }
    var result = [];
    var t = Math.pow(10, 15);
    var team = _.sortBy(data, function(d) {
      var time = new Date(d.date).valueOf();
      var order = d.order ? parseInt(d.order) : 0;
      return (order * t) + time;
    });
    var max = _.max(_.pluck(team, 'order'));
    for (var i = 1, len = max + 1; i < len; i++) {
      result.push(_.findWhere(team, { order: i }));
    }
    res.render('about/index', {
      team: result,
      className: 'is-about-page'
    });
  });
});

// Team page
app.get('/about/:member', function(req, res) {
  var filePath = './content/team/' + req.params.member + '.md';
  file.getData(filePath, isProduction, function(err, result) {
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

// Contact mail
app.post('/contact', function(req, res) {
  var userMailOptions = {
    from: 'Vizzuality <hello@vizzuality.com>',
    to: req.body.email,
    subject: 'Thank you for contact us',
    text: 'Thank you! /r Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias perferendis asperiores eos vel neque molestiae praesentium iste veritatis obcaecati mollitia. Sit debitis est consequuntur aut aliquid alias dolorem optio doloremque',
    html: '<h1>Thank you!</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias perferendis asperiores eos vel neque molestiae praesentium iste veritatis obcaecati mollitia. Sit debitis est consequuntur aut aliquid alias dolorem optio doloremque</p>'
  };
  var staffMailOptions = {
    from: req.body.email,
    to: process.env.EMAIL_RECEIVER,
    subject: 'Contact form',
    html: req.body.message
  };

  transporter.sendMail(userMailOptions, function() {
    transporter.sendMail(staffMailOptions, function(error) {
      if (error) {
        res.status(400).json({ message: 'We\'re sorry, but something went wrong. Please, try again later.' });
      } else {
        res.status(200).json({ message: 'Thank you.' });
      }
    });
  });
});

module.exports = app;
