// Generated on 2013-12-12 using generator-angular 0.6.0-rc.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
                         yeoman: {
                             // configurable paths
                             jekyll: 'app',
                             app: '_site',
                             dist: 'dist'
                         },
                         watch: {
                             jekyllSources: {
                                 files: [
                                     // capture all except css
                                     '<%= yeoman.jekyll %>/{,*/}*.html',
                                     '.tmp/styles/{,*/}*.css',
                                     '{.tmp,<%= yeoman.jekyll %>}/scripts/{,*/}*.js',
                                     '<%= yeoman.jekyll %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                                 ],
                                 tasks: ['shell:jekyll', 'copy:bower']
                             },
                             styles: {
                                 files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
                                 tasks: ['less', 'copy:styles', 'autoprefixer']
                             },
                             livereload: {
                                 options: {
                                     livereload: '<%= connect.options.livereload %>'
                                 },
                                 files: [
                                     '<%= yeoman.app %>/{,*/}*.html',
                                     '.tmp/styles/{,*/}*.css',
                                     '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                                     '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                                 ]
                             }
                         },
                         autoprefixer: {
                             options: ['last 1 version'],
                             dist: {
                                 files: [
                                     {
                                         expand: true,
                                         cwd: '.tmp/styles/',
                                         src: '{,*/}*.css',
                                         dest: '.tmp/styles/'
                                     }
                                 ]
                             }
                         },
                         connect: {
                             options: {
                                 port: 9002,
                                 // Change this to '0.0.0.0' to access the server from outside.
                                 hostname: 'localhost',
                                 livereload: 35729
                             },
                             livereload: {
                                 options: {
                                     open: true,
                                     base: [
                                         '.tmp',
                                         '<%= yeoman.app %>'
                                     ]
                                 }
                             },
                             test: {
                                 options: {
                                     port: 9001,
                                     base: [
                                         '.tmp',
                                         'test',
                                         '<%= yeoman.app %>'
                                     ]
                                 }
                             },
                             dist: {
                                 options: {
                                     base: '<%= yeoman.dist %>'
                                 }
                             }
                         },
                         clean: {
                             dist: {
                                 files: [
                                     {
                                         dot: true,
                                         src: [
                                             '.tmp',
                                             '<%= yeoman.dist %>/*',
                                             '!<%= yeoman.dist %>/.git*'
                                         ]
                                     }
                                 ]
                             },
                             server: '.tmp'
                         },
                         jshint: {
                             options: {
                                 jshintrc: '.jshintrc',
                                 reporter: require('jshint-stylish')
                             },
                             all: [
                                 'Gruntfile.js',
                                 '<%= yeoman.app %>/scripts/{,*/}*.js'
                             ]
                         },
                         // not used since Uglify task does concat,
                         // but still available if needed
                         /*concat: {
                          dist: {}
                          },*/
                         rev: {
                             dist: {
                                 files: {
                                     src: [
                                         '<%= yeoman.dist %>/scripts/{,*/}*.js',
                                         '<%= yeoman.dist %>/styles/{,*/}*.css',
					                    // '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                                         '<%= yeoman.dist %>/styles/fonts/*'
                                     ]
                                 }
                             }
                         },
                         useminPrepare: {
                             html: '<%= yeoman.app %>/index.html',
                             options: {
                                 dest: '<%= yeoman.dist %>'
                             }
                         },
                         usemin: {
                             html: ['<%= yeoman.dist %>/{,*/}*.html'],
                             css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
                             options: {
                                 assetsDirs: ['<%= yeoman.dist %>'],
                             }
                         },
                         imagemin: {
                             dist: {
                                 files: [
                                     {
                                         expand: true,
                                         cwd: '<%= yeoman.app %>/images',
                                         src: '{,*/}*.{png,jpg,jpeg}',
                                         dest: '<%= yeoman.dist %>/images'
                                     }
                                 ]
                             }
                         },
                         svgmin: {
                             dist: {
                                 files: [
                                     {
                                         expand: true,
                                         cwd: '<%= yeoman.app %>/images',
                                         src: '{,*/}*.svg',
                                         dest: '<%= yeoman.dist %>/images'
                                     }
                                 ]
                             }
                         },
                         cssmin: {
                             // By default, your `index.html` <!-- Usemin Block --> will take care of
                             // minification. This option is pre-configured if you do not wish to use
                             // Usemin blocks.
                             // dist: {
                             //   files: {
                             //     '<%= yeoman.dist %>/styles/main.css': [
                             //       '.tmp/styles/{,*/}*.css',
                             //       '<%= yeoman.app %>/styles/{,*/}*.css'
                             //     ]
                             //   }
                             // }
                         },
                         htmlmin: {
                             dist: {
                                 options: {
                                 },
                                 files: [
                                     {
                                         expand: true,
                                         cwd: '<%= yeoman.app %>',
                                         src: ['*.html'],
                                         dest: '<%= yeoman.dist %>'
                                     }
                                 ]
                             },
                             final:{
                                 options:{
                                     removeCommentsFromCDATA: true,
                                      removeComments: true,
                                      collapseWhitespace: false,
                                      collapseBooleanAttributes: true,
                                      removeAttributeQuotes: true,
                                      removeRedundantAttributes: true,
                                      useShortDoctype: true,
                                      removeEmptyAttributes: true,
                                      removeOptionalTags: true
                                 },
                                 files: [{
                                     expand: true,
                                     cwd: '<%= yeoman.dist %>',
                                     src: ['*.html'],
                                     dest: '<%= yeoman.dist %>'
                                 }]
                             }
                         },
                         // Put files not handled in other tasks here
                         copy: {
                             dist: {
                                 files: [
                                     {
                                         expand: true,
                                         dot: true,
                                         cwd: '<%= yeoman.app %>',
                                         dest: '<%= yeoman.dist %>',
                                         src: [
                                             '*.{ico,png,txt}',
                                             '.htaccess',
                                             'bower_components/**/*',
                                             'images/{,*/}*.{gif,webp}',
                                             'fonts/*',
                                             'data/*.json'
                                         ]
                                     },
                                     {
                                         expand: true,
                                         cwd: '.tmp/images',
                                         dest: '<%= yeoman.dist %>/images',
                                         src: [
                                             'generated/*'
                                         ]
                                     },
                                     {
                                         expand: true,
                                         cwd: '<%= yeoman.app %>/bower_components/font-awesome/fonts/',
                                         dest: '<%= yeoman.dist %>/fonts/',
                                         src: ['**']
                                     }
                                 ]
                             },
                             styles: {
                                 expand: true,
                                 cwd: '<%= yeoman.app %>/styles',
                                 dest: '.tmp/styles/',
                                 src: '{,*/}*.css'
                             },
                             bower: {
                                 expand: true,
                                 cwd: '<%= yeoman.jekyll %>',
                                 dest: '<%= yeoman.app %>',
                                 src: 'bower_components/**/*'
                             }
                         },
                         concurrent: {
                             server: [
                                 'copy:styles'
                             ],
                             test: [
                                 'copy:styles'
                             ],
                             dist: [
                                 'copy:styles',
                                 'imagemin',
                                 'svgmin',
                                 'htmlmin:dist'
                             ]
                         },
                         cdnify: {
                             dist: {
                                 html: ['<%= yeoman.dist %>/*.html']
                             }
                         },
                         ngmin: {
                             dist: {
                                 files: [
                                     {
                                         expand: true,
                                         cwd: '.tmp/concat/scripts',
                                         src: '*.js',
                                         dest: '.tmp/concat/scripts'
                                     }
                                 ]
                             }
                         },
                         uglify: {
                             dist: {
                                 files: {
                                     '<%= yeoman.dist %>/scripts/scripts.js': [
                                         '<%= yeoman.dist %>/scripts/scripts.js'
                                     ]
                                 }
                             }
                         },
                         less: {
                             development: {
                                 options: {
                                     paths: ["<%= yeoman.app %>/styles"],
                                     yuicompress: true
                                 },
                                 files: {
                                     "<%= yeoman.app %>/styles/style.css": "<%= yeoman.app %>/styles/style.less"
                                 }
                             }
                         },
                         htmllint: {
                             all: ["app/index.html"]
                         },
                         'gh-pages': {
                             options: {
                                 base: 'dist',
                                 push: false,
                                 message: 'Auto-generated commit (cloudbees forge)'
                             },
                             src: ['**']
                         },
                        shell:{
                            jekyll: {
                                command: 'rm -rf <%= yeoman.app %>/*; jekyll build;',
                                stdout: true
                            }
                        }
                     });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([   'shell:jekyll',
                           'copy:bower',
                           'less',
                           'clean:server',
                           'concurrent:server',
                           'autoprefixer',
                           'connect:livereload',
                           'watch'
                       ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'shell:jekyll',
        'copy:bower',
        'less',
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'htmlmin:final'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
