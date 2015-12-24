'use strict';

var config  = require('../config'),
    pkg     = require('../../package.json'),
    gulp    = require('gulp'),
    replace = require('gulp-replace-task');

// Replace task
gulp.task('replace', function() {
  return gulp.src('app/*.html')
  .pipe(replace({
    patterns: [
      {
        match: 'version',
        replacement: pkg.version
      },
      {
        match: 'build',
        replacement: process.env.BUILD_NUMBER ? process.env.BUILD_NUMBER : 'local'
      },
      {
        match: 'nocache',
        replacement: Date.now()
      }
    ]
  }))
  .pipe(gulp.dest(config.dist.root));
});
