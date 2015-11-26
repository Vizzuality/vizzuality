var _ = require('underscore');
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var root = process.cwd();
var file = require(root + '/app/helpers/file');
var teamPath = root + '/content/team';

module.exports = function(app) {

  'use strict';

  var isProduction = (app.get('env') === 'production');
  var t = Math.pow(10, 15);

  // About page
  app.get('/about', csrfProtection, function(req, res) {
    file.getFiles(teamPath, isProduction, function(err, data) {
      var result = [];
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
        className: 'is-about-page',
        csrfToken: req.csrfToken()
      });
    });
  });

  // Team page
  app.get('/about/:member', function(req, res) {

    var result, index;

    file.getFiles(teamPath, isProduction, function(err, team) {

      team = _.sortBy(team, function(d) {
        var time = new Date(d.date).valueOf();
        var order = d.order ? parseInt(d.order) : 0;
        return (order * t) + time;
      });

      _.each(team, function(member, i) {
        if (member.slug === req.params.member) {
          result = member;
          index = i;
        }
      });

      res.render('about/team', {
        data: result,
        prev: team[index - 1],
        next: team[index + 1],
        content: result.html,
        className: 'is-team-page'
      });

    });

  });

};
