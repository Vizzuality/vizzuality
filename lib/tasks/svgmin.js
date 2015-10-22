module.exports = {
  options: {
    plugins: [{
      removeViewBox: false
    }, {
      removeUselessStrokeAndFill: false
    }]
  },
  dist: {
    files: [{
      expand: true,
      cwd: '<%= app %>/images/clients',
      src: ['{,*/}{,*/}*.svg'],
      dest: '<%= build %>/images/clients'
    }]
  }
};
