module.exports = (grunt)->

  require('load-grunt-tasks')(grunt)

  grunt.initConfig

    root:
      app: './app/assets',
      build: './public/assets'

    clean: [ '<%= root.build %>' ]

    nodemon:
      dev:
        script: 'server.coffee'

    copy:
      main:
        files: [
          {
            expand: true
            cwd: '<%= root.app %>/fonts'
            src: ['**']
            dest: '<%= root.build %>/fonts'
          }
        ]

    coffee:
      compile:
        files:
          '<%= root.build %>/scripts/main.js': '<%= root.app %>/scripts/main.coffee'

    uglify:
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

    imagemin:
      options:
        optimizationLevel: 3,
        svgoPlugins: [ removeViewBox: false ]
      static:
        files: [{
          expand: true
          cwd: '<%= root.app %>/images'
          src: ['**/*.{png,jpg,gif}']
          dest: '<%= root.build %>/images'
        }, {
          expand: true
          cwd: 'content/team/images'
          src: ['**/*.{png,jpg,gif}']
          dest: '<%= root.build %>/images/team'
        }]

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
  grunt.registerTask 'build', ['clean', 'stylus', 'cssmin', 'copy', 'coffee', 'uglify', 'imagemin']
  grunt.registerTask 'serve', ['stylus', 'symlink', 'coffee', 'concurrent']
