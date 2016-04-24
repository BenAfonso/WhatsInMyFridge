module.exports = function(grunt) {
  grunt.initConfig({

    // Compile Sass
    sass: {
      dist: {
          style: 'expanded',
          files: {
            'public/styles/style.css': 'public/styles/sass/style.sass',
            'public/styles/login.css': 'public/styles/sass/login.sass'
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
        files: '**/*.sass',
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

  // Register the nodemon task when we run grunt
  grunt.registerTask('default', ['sass', 'concurrent']);


};
