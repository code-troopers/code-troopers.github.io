'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('prod', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = true;

  runSequence(['i18n', 'styles', 'images', 'fonts', 'views', 'replace', 'copy', 'maintenance', 'browserify'], 'gzip', cb);

});
