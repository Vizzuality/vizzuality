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
  teamImages: {
    src: 'content/team/images',
    dest: '<%= build %>/images/team'
  },
  projectImages:{
    src: 'content/projects/images',
    dest: '<%= build %>/images/projects'
  },
  clientsImages: {
    src: '<%= app %>/images/clients',
    dest: '<%= build %>/images/clients'
  }
};
