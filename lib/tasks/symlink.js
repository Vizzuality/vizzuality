module.exports = {
  options: {
    overwrite: true
  },
  scripts: {
    src: '<%= app %>/scripts',
    dest: '<%= build %>/scripts'
  },
  fonts: {
    src: '<%= app %>/fonts',
    dest: '<%= build %>/fonts'
  },
  images: {
    src: '<%= app %>/images',
    dest: '<%= build %>/images'
  },
  teamImages: {
    src: 'content/team/images',
    dest: '<%= build %>/images/team'
  },
  projectImages:{
    src: 'content/projects/images',
    dest: '<%= build %>/images/projects'
  }
};
