module.exports = {
  options: {
    shorthandCompacting: false,
    roundingPrecision: -1
  },
  target: {
    files: {
      '<%= build %>/styles/main.css': [
        './bower_components/normalize-css/normalize.css',
        '<%= build %>/styles/main.css'
      ]
    }
  }
};
