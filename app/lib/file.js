'use strict';

var fs        = require('fs');
var path      = require('path');
var matter    = require('gray-matter');
var Showdown  = require('showdown');
var converter = new Showdown.converter();
var cache = {};

module.exports = {

  getData: function(filePath, next) {
    if (cache[filePath]) {
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

  getFiles: function(dir, next) {
    var data = [];
    if (cache[dir]) {
      return next(null, cache[dir]);
    }
    var files = fs.readdirSync(dir).filter(function(file) {
      return file.indexOf('.') !== 0 && path.extname(file) === '.md';
    });
    for (var i = 0, len = files.length; i < len; i++) {
      var file = files[i];
      var filePath = path.join(dir, file);
      var element = matter(fs.readFileSync(filePath, 'utf8')).data;
      element.slug = file.split('.md')[0];
      data.push(element);
    }
    cache[dir] = data;
    next(null, data);
  }

};
