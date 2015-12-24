'use strict';

var gulp   = require('gulp'),
    gzip   = require('gulp-gzip'),
    tar    = require('gulp-tar'),
    config = require('../config'),
    pkg    = require('../../package.json');

gulp.task('gzip', function() {

  return gulp.src(config.dist.root + '/**/*')
    .pipe(tar(pkg.name + '-v' + pkg.version + '.tar'))
    .pipe(gzip())
    .pipe(gulp.dest('.'));

});
