module.exports = {
  options: {
    shorthandCompacting: false,
    roundingPrecision: -1
  },
  target: {
    files: {
      '<%= build %>/styles/main.css': [
        './node_modules/normalize-css/normalize.css',
        '<%= app %>/lib/leaflet-routing-machine/leaflet-routing-machine.css',
        '<%= build %>/styles/main.css'
      ]
    }
  }
};
