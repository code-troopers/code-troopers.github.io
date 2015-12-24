'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var less         = require('gulp-less');
var gulpif       = require('gulp-if');
var browserSync  = require('browser-sync');
var minifycss       = require('gulp-minify-css');	
var autoprefixer = require('gulp-autoprefixer');
var isProd    = require('../util/isProduction');

gulp.task('styles', function () {
  return gulp.src(config.styles.src)
    .pipe(less())
    .pipe(autoprefixer("last 1 version"))
    .pipe(gulpif(isProd() , minifycss({compatibility: 'ie8'})))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));
});
