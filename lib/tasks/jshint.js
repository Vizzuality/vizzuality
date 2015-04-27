module.exports = {
  options: {
    reporter: require('jshint-stylish'),
    jshintrc: './.jshintrc'
  },
  all: [
    '*.js',
    'app/{,*/}*.js',
    'app/assets/scripts/{,*/}*.js',
    'lib/tasks/{,*/}*.js',
    'test/{,*/}*.js'
  ]
};
