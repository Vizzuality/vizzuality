module.exports = (grunt)->

  require('load-grunt-tasks')(grunt)

  grunt.initConfig

    root:
      app: './app/assets',
      build: './public/assets'

    nodemon:
      dev:
        script: 'server.coffee'

    coffee:
      compile:
        files:
          '<%= root.build %>/scripts/main.js': '<%= root.app %>/scripts/main.coffee'

    stylus:
      compile:
        options:
          use: [
            require('fluidity')
            () ->
              require('autoprefixer-stylus')({ browsers: 'last 2 versions' })
          ]
        files:
          '<%= root.build %>/styles/main.css': '<%= root.app %>/styles/main.styl'

    cssmin:
      options:
        shorthandCompacting: false
        roundingPrecision: -1
      target:
        files:
          '<%= root.build %>/styles/main.css': [
            './bower_components/normalize-css/normalize.css'
            '<%= root.build %>/styles/main.css'
          ]

    symlink:
      options:
        overwrite: true
      fonts:
        src: '<%= root.app %>/fonts',
        dest: '<%= root.build %>/fonts'
      teamImages:
        src: 'content/team/images',
        dest: '<%= root.build %>/images/team'
      clientsImages:
        src: '<%= root.app %>/images/clients',
        dest: '<%= root.build %>/images/clients'

    watch:
      options:
        spawn: false
      styles:
        files: '<%= root.app %>/styles/{,*/}{,*/}*.styl'
        tasks: ['stylus']

    concurrent:
      options:
        logConcurrentOutput: true
      dev:
        tasks: ['nodemon', 'watch']

  grunt.registerTask 'default', ['stylus', 'symlink', 'coffee']
  grunt.registerTask 'build', ['stylus', 'cssmin', 'symlink', 'coffee']
  grunt.registerTask 'serve', ['stylus', 'symlink', 'coffee', 'concurrent']
