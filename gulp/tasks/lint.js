'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var less = require('gulp-less');
var csslint = require('gulp-csslint');
var sourcemaps = require('gulp-sourcemaps');
var lessReporter = require('gulp-csslint-less-reporter');

gulp.task('lint', function () {
  return gulp.src(config.styles.src)
  .pipe(sourcemaps.init())
  	.pipe(less())
  	.pipe(csslint())
    .pipe(lessReporter('app/styles/style.less'))
});
