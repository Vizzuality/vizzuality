module.exports = {
  options: {
    optimizationLevel: 3,
    svgoPlugins: [{ removeViewBox: false }],
    use: [ require('imagemin-mozjpeg')() ]
  },
  static:{
    files: [{
      expand: true,
      cwd: '<%= app %>/images',
      src: ['*.{png,jpg,gif}'],
      dest: '<%= build %>/images'
    }, {
      expand: true,
      cwd: '<%= app %>/images/clients',
      src: ['**/*.{png,jpg,gif}'],
      dest: '<%= build %>/images/clients'
    }, {
      expand: true,
      cwd: '<%= app %>/images/office',
      src: ['**/*.{png,jpg,gif}'],
      dest: '<%= build %>/images/office'
    }, {
      expand: true,
      cwd: 'content/team/images',
      src: ['**/*.{png,jpg,gif}'],
      dest: '<%= build %>/images/team'
    }, {
      expand: true,
      cwd: 'content/projects/images',
      src: ['**/*.{png,jpg,gif}'],
      dest: '<%= build %>/images/projects'
    }]
  }
};
