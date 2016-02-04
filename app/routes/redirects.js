'use strict';

module.exports = function(app) {

  app.get('/company', function(req, res) {
    res.redirect('/about');
  });

  app.get('/cartoset', function(req, res) {
    res.redirect('/');
  });

  app.get('/products', function(req, res) {
    res.redirect('/');
  });

  app.get('/products/*', function(req, res) {
    res.redirect('/');
  });

};
