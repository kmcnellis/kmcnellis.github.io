// Grunt file modified from http://o.zasadnyy.com/blog/optimized-jekyll-site-with-grunt/

'use strict';

module.exports = function(grunt) {
  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('jit-grunt')(grunt,{
  });

  // Define the configuration for all the tasks
  grunt.initConfig({
    // Project settings
    pkg: grunt.file.readJSON('package.json'),
    app: {
      app: 'app',
      dist: 'dist',
      baseurl: ''
    },
    watch: {
      less: {
        files: ['<%= app.app %>/_assets/less/**/*.{less,css}'],
        tasks: ['less:server', 'autoprefixer']
      },
      scripts: {
        files: ['<%= app.app %>/_assets/js/*.{js}'],
        tasks: ['uglify']
      },
      copy: {
        files: ['<%= app.app %>/_assets/{resources,css,img,js}/**/*'],
        tasks: ['copy:server']
      },
      jekyll: {
        files: [
          '<%= app.app %>/**/*.{html,yml,md,mkd,markdown}'
        ],
        tasks: ['jekyll:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.jekyll/**/*.{html,yml,md,mkd,markdown}',
          '.tmp/<%= app.baseurl %>/{css,img,js}/*',
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: {
            target: 'http://localhost:9000/<%= app.baseurl %>'
          },
          base: [
            '.jekyll',
            '.tmp',
            '<%= app.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: {
            target: 'http://localhost:9000/<%= app.baseurl %>'
          },
          base: [
            '<%= app.dist %>',
            '.tmp'
          ]
        }
      }
    },
    clean: {
      server: [
        '.jekyll',
        '.tmp'
      ],
      dist: {
        files: [{
          dot: true,
          src: [
            '.jekyll',
            '.tmp',
            '<%= app.dist %>/*',
            '!<%= app.dist %>/.git*'
          ]
        }]
      }
    },
    jekyll: {
      options: {
        config: '_config.yml,_config.build.yml',
        src: '<%= app.app %>'
      },
      dist: {
        options: {
          dest: '<%= app.dist %>/<%= app.baseurl %>',
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll/<%= app.baseurl %>'
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          minifyJS: true,
          minifyCSS: true
        },
        files: [{
          expand: true,
          cwd: '<%= app.dist %>/<%= app.baseurl %>',
          src: '**/*.html',
          dest: '<%= app.dist %>/<%= app.baseurl %>'
        }]
      }
    },
    uglify: {
      options: {
        preserveComments: false
      },
      dist: {
        files: {
          '<%= app.dist %>/<%= app.baseurl %>/js/scripts.js': ['<%= app.app %>/_assets/js/**/*.js']
        }
      }
    },
    less: {
      options: {
        // includePaths: ['bower_components/bootstrap-less/less']
      },
      server: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: '<%= app.app %>/_assets/less',
          src: '**/*.{less,css}',
          dest: '.tmp/<%= app.baseurl %>/css',
          ext: '.css'
        }]
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: [{
          expand: true,
          cwd: '<%= app.app %>/_assets/less',
          src: '**/*.{less,css}',
          dest: '<%= app.dist %>/<%= app.baseurl %>/css',
          ext: '.css'
        }]
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app.dist %>/<%= app.baseurl %>/css',
          src: '**/*.css',
          dest: '<%= app.dist %>/<%= app.baseurl %>/css'
        }]
      }
    },
    critical: {
      dist: {
        options: {
          base: './',
          css: [
            '.tmp/<%= app.baseurl %>/css/blog.css'
          ],
          minify: true,
          width: 320,
          height: 480
        },
        files: [{
          expand: true,
          cwd: '<%= app.dist %>/<%= app.baseurl %>',
          src: ['**/*.html'],
          dest: '<%= app.dist %>/<%= app.baseurl %>'
        }]
      }
    },
    imagemin: {
      options: {
        progressive: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app.app %>/_assets/img',
          src: '**/*.{jpg,jpeg,png,gif}',
          dest: '<%= app.dist %>/<%= app.baseurl %>/img'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app.app %>/_assets/img',
          src: '**/*.svg',
          dest: '<%= app.dist %>/<%= app.baseurl %>/img'
        }]
      }
    },
    copy: {
      server: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= app.app %>/_assets/',
          src: [
            '{css,img,js}/*',
            '{css,img,js}/**/*'
          ],
          dest: '.tmp/<%= app.baseurl %>'
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= app.app %>/_assets/',
          src: [
            '{css,js}/*',
            '{css,js}/**/*'
          ],
          dest: '<%= app.dist %>/<%= app.baseurl %>'
        }]
      }
    },
    buildcontrol: {
      dist: {
        options: {
          dir: '<%= app.dist %>/<%= app.baseurl %>',
          remote: 'git@github.com:user/repo.git',
          branch: 'gh-pages',
          commit: true,
          push: true,
          connectCommits: false
        }
      }
    }
  });

  // Define Tasks
  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'jekyll:server',
      'less:server',
      'copy:server',
      'autoprefixer',
      'uglify',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function() {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'jekyll:dist',
    'less:dist',
    'imagemin:dist',
    'svgmin:dist',
    'copy:dist',
    'autoprefixer:dist',
    'uglify:dist',
    'critical:dist',
    'htmlmin:dist'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'buildcontrol'
  ]);

  grunt.registerTask('default', [
    'serve'
  ]);
};
