'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('devvv', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = false;

  runSequence(['jekyll'], cb);

});
