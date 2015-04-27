var path = require('path');

module.exports = function(grunt) {

  'use strict';

  require('load-grunt-tasks')(grunt);

  require('load-grunt-config')(grunt, {
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
  });

  grunt.registerTask('default', ['stylus', 'symlink']);

  grunt.registerTask('build', [
    'clean', 'stylus', 'cssmin', 'copy', 'uglify', 'imagemin'
  ]);

  grunt.registerTask('serve', ['stylus', 'symlink', 'concurrent']);

  grunt.registerTask('deploy', ['heroku-deploy:production']);

};
