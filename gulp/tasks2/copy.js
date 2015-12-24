'use strict';
var config = require('../config'),
    gulp = require('gulp');

/**
 * Simple task used to copy files to the build path.
 */
gulp.task('copy', function() {
  return gulp.src(['app/*.txt', 'app/*.ico'])
    .pipe(gulp.dest((config.dist.root)));
});
