'use strict';

var autoprefixer = require('autoprefixer-stylus');

module.exports = {
  compile: {
    options: {
      use: [
        require('fluidity'),
        function() {
          return autoprefixer({ browsers: 'last 2 versions' });
        }
      ]
    },
    files: {
      '<%= build %>/styles/main.css': '<%= app %>/styles/main.styl'
    }
  }
};
