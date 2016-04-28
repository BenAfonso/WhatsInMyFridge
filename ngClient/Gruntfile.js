module.exports = function(grunt) {
  grunt.initConfig({
    // Wire deps
    wiredep: {
      task: {
        src: ['index.html']
      }
    },

    // Compile Sass
    sass: {
      dist: {
          style: 'expanded',
          files: {
            'public/styles/style.css': 'public/styles/sass/style.sass',
            'public/styles/login.css': 'public/styles/sass/login.sass',
            'public/styles/style2.css': 'public/styles/sass/style2.sass',
            'public/styles/config.css': 'public/styles/sass/config.scss'
          }
      }
    },

    watch: {
      html: {
        options: {livereload: true},
        files: ['**/*.html']
      },
      css: {
        options: {livereload: true},
        files: ['**/*.sass','**/*.scss'],
        tasks: ['sass']
      }
    },


    // Configuring nodemon
    nodemon: {
      dev: {
          script: 'index.js'
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }

  });

  // Load nodemon
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-wiredep');

  // Register the nodemon task when we run grunt
  grunt.registerTask('default', ['sass', 'concurrent', 'wiredep']);


};
