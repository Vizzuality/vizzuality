module.exports = {
  main: {
    files: [{
      expand: true,
      cwd: '<%= app %>/fonts',
      src: ['**'],
      dest: '<%= build %>/fonts'
    }, {
      expand: true,
      cwd: 'content/projects/videos',
      src: ['**'],
      dest: '<%= build %>/videos/projects'
    }]
  }
};
