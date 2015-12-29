'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('deploy', function(cb) {

  cb = cb || function() {};

  global.isProd = true;
  runSequence('clean', 'build','ghpages', cb);
});
