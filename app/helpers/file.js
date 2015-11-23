'use strict';

var fs        = require('fs');
var path      = require('path');
var matter    = require('gray-matter');
var Showdown  = require('showdown');
var yaml      = require('js-yaml')
var converter = new Showdown.converter();
var cache = {};

module.exports = {

  getData: function(filePath, hasCache, next) {
    if (hasCache && cache[filePath]) {
      return next(null, cache[filePath]);
    }
    fs.readFile(filePath, 'utf8', function(err, file) {
      var result;
      if (err || !file) {
        return next({
          error: 'file not found'
        });
      }
      result = cache[filePath] = matter(file);
      result.data.slug = path.basename(filePath).split('.md')[0];
      result.html = converter.makeHtml(result.content);
      next(null, result);
    });
  },

  getFiles: function(dir, hasCache, next) {
    var data = [];
    if (hasCache && cache[dir]) {
      return next(null, cache[dir]);
    }
    var files = fs.readdirSync(dir).filter(function(file) {
      return file.indexOf('.') !== 0 && path.extname(file) === '.md';
    });
    for (var i = 0, len = files.length; i < len; i++) {
      var file = files[i];
      var filePath = path.join(dir, file);
      var result = matter(fs.readFileSync(filePath, 'utf8'));
      var element = result.data;
      element.slug = file.split('.md')[0];
      element.html = converter.makeHtml(result.content);
      element.grid = !element.grid ? 1 : element.grid > 3 ? 3 : element.grid;
      data.push(element);
    }
    cache[dir] = data;
    next(null, data);
  },

  getImages: function(dir, hasCache, next) {
    var data = [];
    if (hasCache && cache[dir]) {
      return next(null, cache[dir]);
    }
    var files = fs.readdirSync(dir).filter(function(file) {
      return file.indexOf('.') !== 0 && path.extname(file) === '.png';
    });
    for (var i = 0, len = files.length; i < len; i++) {
      var file = files[i];
      var filePath = path.join(dir, file);
      var element = {};
      element.slug = file.split('.png')[0];
      element.src = file;
      data.push(element);
    }
    cache[dir] = data;
    next(null, data);
  },

  getYaml: function(dir, hasCache, next) {
    var data = [];
    if (hasCache && cache[dir]) {
      return next(null, cache[dir]);
    }
    var data = yaml.safeLoad(fs.readFileSync(dir, 'utf8'));
    data = data.logos.map(function(d) {
      d.width = d.width || 175;
      return d;
    });
    cache[dir] = data;
    next(null, data);
  }

};
