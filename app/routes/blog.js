'use strict';

var _ = require('underscore');
var root = process.cwd();
var file = require(root + '/app/helpers/file');
var postsPath = root + '/content/posts';

module.exports = function(app) {

  var isProduction = (app.get('env') === 'production');
  var itemsPerPage = 5;

  app.get('/blog', function(req, res) {

    var page = req.query.page ? parseInt(req.query.page) : 1;
    var items = page * itemsPerPage;

    file.getFiles(postsPath, isProduction, function(err, data) {
      var posts = _.sortBy(data, function(d) {
        return -new Date(d.date).valueOf();
      }).slice(items - itemsPerPage, items);
      res.render('posts/index', {
        posts: posts,
        prev: page === 1 ? null : page - 1,
        next: page === (data.length - 1) && data.length <= itemsPerPage ? null : page + 1
      });
    });

  });

  app.get('/blog/:slug', function(req, res) {

    file.getFiles(postsPath, isProduction, function(err, data) {
      var result, index = 0;
      var posts = _.sortBy(data, function(d) {
        return -new Date(d.date).valueOf();
      });

      _.each(posts, function(post, i) {
        if (post.slug === req.params.slug) {
          result = post;
          index = i;
        }
      });

      res.render('posts/show', {
        post: result,
        prev: posts[index - 1],
        next: posts[index + 1]
      });
    });

  });

};
