module.exports = {
  main: {
    files: [{
      expand: true,
      cwd: '<%= app %>/fonts',
      src: ['**'],
      dest: '<%= build %>/fonts'
    }]
  }
};
