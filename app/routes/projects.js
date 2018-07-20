var _ = require('underscore');
var MobileDetect = require('mobile-detect');
var request = require('request');

var root = process.cwd();
var file = require(root + '/app/helpers/file');
var projectsPath = root + '/content/projects',
    projectsOrderConfig = require(root + '/config/projects.json');
var clientsPath = root + '/content/clients/logos.yml';

module.exports = function(app) {

  'use strict';

  var isProduction = (app.get('env') === 'production');
  var t = Math.pow(10, 15);

  // Home and projects page
  app.get('/', function(req, res) {

    file.getYaml(clientsPath, isProduction, function(err, clientsLogo) {
      file.getFiles(projectsPath, isProduction, function(err, data) {
        var projectsWithOrder = _.map(data, function(d) {
          var projectConfig = projectsOrderConfig[d.slug];

          if (projectConfig !== undefined) {
            d.grid = projectConfig.grid;
            d.order = projectConfig.order;
          }
          return d;
        });

        var projectsResult = _.sortBy(_.where(projectsWithOrder, {
          highlighted: true
        }), function(d) {
          // var time = new Date(d.date).valueOf();
          var order = d.order ? parseInt(d.order, 10) : 0;
          return order;
        });

        var renderPage = function(postInfo) {
          res.render('projects/index', {
            projects: projectsResult,
            postInfo: postInfo == 'undefined' ? null : postInfo,
            clientsLogo: clientsLogo,
            className: 'is-project-page'
          });
        };

        var options = {
          url: 'https://api.tumblr.com/v2/blog/vizzuality.tumblr.com/posts',
          api_key: 'L9h1IOB5XDKZy4LbeT6A5naG7QoafH003pY6dqrhWR1I92dKcU',
          offset: 0,
          limit: 1
        };

        request({
          url: options.url,
          qs: {
            api_key: options.api_key,
            offset: options.offset,
            limit: options.limit
          }
        }, function (error, response, body) {

          if (!error && response.statusCode == 200) {
            var latestPost = JSON.parse(body).response.posts[0];

            var postInfo = {
              title: latestPost.title,
              url: latestPost.post_url
            };

            renderPage(postInfo);

          } else {

            renderPage();

          }
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
