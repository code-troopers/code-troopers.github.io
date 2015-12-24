'use script';

var config       = require('../config');
var gulp         = require('gulp');
var concat       = require('gulp-concat');
var gulpif       = require('gulp-if');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var uglify       = require('gulp-uglify');
var isProd    = require('../util/isProduction');

gulp.task('scripts', ['ie8'], function () {
  return gulp.src(config.scripts.src)
    .pipe(concat('scripts.js'))
    .pipe(gulpif(isProd(), uglify()))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));
});

gulp.task('ie8', function () {
  return gulp.src(config.scripts.srcIE8)
    .pipe(concat('ie8.js'))
    .pipe(gulpif(isProd(), uglify()))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));
});