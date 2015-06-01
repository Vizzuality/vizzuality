module.exports = {
  compile: {
    files: {
      '<%= build %>/scripts/main.js': [
        '<%= app %>/lib/leaflet-routing-machine/leaflet-routing-machine.js',
        '<%= app %>/scripts/main.js'
      ]
    }
  }
};
