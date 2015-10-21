var _ = require('underscore');
var root = process.cwd();
var file = require(root + '/app/helpers/file');
var projectsPath = root + '/content/projects';
var postsPath = root + '/content/posts';

module.exports = function(app) {

  'use strict';

  var isProduction = (app.get('env') === 'production');
  var t = Math.pow(10, 15);

  // Home and projects page
  app.get('/', function(req, res) {

    file.getFiles(postsPath, isProduction, function(err, posts) {

      var lastPost = _.first(_.sortBy(posts, function(p) {
        return new Date(p.date).valueOf() * -1;
      }));

      file.getFiles(projectsPath, isProduction, function(err, data) {
        res.render('projects/index', {
          projects: _.sortBy(_.where(data, { highlighted: true }), function(d) {
            var time = new Date(d.date).valueOf();
            var order = d.order ? parseInt(d.order) : 0;
            return (order * t) + time;
          }),
          lastPost: lastPost,
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
        prev: projects[index - 1],
        next: projects[index + 1],
        content: result.html,
        className: 'is-project-detail-page'
      });

    });

  });

};
