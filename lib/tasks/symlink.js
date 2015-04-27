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
  clientsImages: {
    src: '<%= app %>/images/clients',
    dest: '<%= build %>/images/clients'
  }
};
