module.exports = {
  options: {
    overwrite: true
  },
  team: {
    options: {
      width: 512,
      height: 512
    },
    src: '<%= app %>/images/team/*.{png,jpg,gif}',
    dest: '<%= app %>/images/team/'
  },
  projects: {
    options: {
      width: 1920,
      height: 1080
    },
    src: '<%= app %>/images/projects/*.{png,jpg,gif}',
    dest: '<%= app %>/images/projects/'
  }
};
