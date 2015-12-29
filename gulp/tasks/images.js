'use strict';

var config      = require('../config');
var changed     = require('gulp-changed');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var imagemin    = require('gulp-imagemin');
var browserSync = require('browser-sync');

gulp.task('images', function() {
  return gulp.src(config.images.src)
    .pipe(changed(config.images.dest))
   // Images are now compress on repo (see task below)
   // .pipe(imagemin())
    .pipe(gulp.dest(config.images.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
});

gulp.task('compress-images', function(){
	return gulp.src(config.images.src)
	.pipe(imagemin())
	.pipe(gulp.dest(config.images.destSrc))
});
