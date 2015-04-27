module.exports = {
  options: {
    spawn: false
  },
  styles: {
    files: '<%= app %>/styles/{,*/}{,*/}*.styl',
    tasks: ['stylus']
  },
  scripts: {
    files: [
      '*.js',
      'app/{,*/}*.js',
      'app/assets/scripts/{,*/}*.js',
      'lib/tasks/{,*/}*.js',
      'test/{,*/}*.js'
    ],
    tasks: ['jshint']
  }
};
