'use strict';

var path = require('path');

module.exports = function(grunt) {

  var options = {

    configPath: path.join(process.cwd(), 'lib', 'tasks'),

    init: true,

    data: {
      app: './app/assets',
      build: './public/assets'
    },

    loadGruntTasks: {
      pattern: 'grunt-*',
      config: require('./package.json'),
      scope: 'dependencies'
    }

  };

  require('load-grunt-tasks')(grunt);
  require('load-grunt-config')(grunt, options);

  grunt.registerTask('default', ['stylus', 'symlink']);
  grunt.registerTask('serve', ['stylus', 'symlink', 'concurrent']);
  grunt.registerTask('build', [
    'clean',
    'stylus',
    'cssmin',
    'copy',
    'uglify',
    'imagemin',
    'svgmin'
  ]);

};
