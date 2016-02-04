var _ = require('underscore');
var MobileDetect = require('mobile-detect');
var root = process.cwd();
var file = require(root + '/app/helpers/file');
var projectsPath = root + '/content/projects';
var clientsPath = root + '/content/clients/logos.yml';

module.exports = function(app) {

  'use strict';

  var isProduction = (app.get('env') === 'production');
  var t = Math.pow(10, 15);

  // Home and projects page
  app.get('/', function(req, res) {

    file.getYaml(clientsPath, isProduction, function(err, clientsLogo) {
      file.getFiles(projectsPath, isProduction, function(err, data) {
        res.render('projects/index', {
          projects: _.sortBy(_.where(data, { highlighted: true }), function(d) {
            var time = new Date(d.date).valueOf();
            var order = d.order ? parseInt(d.order) : 0;
            return (order * t) + time;
          }),
          clientsLogo: clientsLogo,
          className: 'is-project-page'
        });
      });
    });

  });

  // Projects routes redirect to index
  app.get('/projects', function(req, res) {
    res.redirect('/');
  });

  // API - get all projects
  app.get('/api/projects', function(req, res) {

    file.getFiles(projectsPath, isProduction, function(err, data) {
      res.json({
        projects: _.sortBy(data, function(d) {
          var time = new Date(d.date).valueOf();
          var order = d.order ? parseInt(d.order) : 0;
          return (order * t) + time;
        })
      });
    });

  });

  // Project detail page
  app.get('/projects/:project', function(req, res) {

    var md = new MobileDetect(req.headers['user-agent']);

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

      if (!result) {
        return res.redirect('/projects');
      }

      res.render('projects/show', {
        data: result,
        prev: projects[index - 1],
        next: projects[index + 1],
        content: result.html,
        className: 'is-project-detail-page',
        isMobile: !!md.mobile()
      });

    });

  });

};
