module.exports = (grunt)->

  require('load-grunt-tasks')(grunt)

  grunt.initConfig

    root:
      app: './app/assets',
      build: './public/assets'

    nodemon:
      dev:
        script: 'server.coffee'

    stylus:
      compile:
        options:
          use: [ require('fluidity') ]
        files:
          '<%= root.build %>/styles/main.css': '<%= root.app %>/styles/main.styl'

    symlink:
      options:
        overwrite: true
      teamImages:
        src: 'content/team/images',
        dest: '<%= root.build %>/images/team'

    watch:
      options:
        spawn: false
      styles:
        files: '<%= root.app %>/styles/{,*/}*.styl'
        tasks: ['stylus']

    concurrent:
      options:
        logConcurrentOutput: true
      dev:
        tasks: ['nodemon', 'watch']

  grunt.registerTask 'default', ['stylus', 'symlink']
  grunt.registerTask 'serve', ['stylus', 'symlink', 'concurrent']
