'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = false;

  runSequence(['i18n', 'styles', 'images', 'fonts', 'views', 'copy', 'maintenance', 'replace', 'browserify'], 'watch', cb);

});
