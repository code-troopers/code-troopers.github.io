'use strict';

var config       = require('../config');
var combiner = require('stream-combiner2');
var gulp         = require('gulp');
var less         = require('gulp-less');
var gulpif       = require('gulp-if');
var browserSync  = require('browser-sync');
var nano       = require('gulp-cssnano');
var csslint      = require('gulp-csslint');
var autoprefixer = require('gulp-autoprefixer');
var isProd    = require('../util/isProduction');
var concatCss = require('gulp-concat-css');

gulp.task('styles', function () {
  var combined = combiner.obj([
		gulp.src(config.styles.src),
		less(),
    concatCss('style.css'),
    autoprefixer("last 1 version"),
    gulpif(isProd() , nano()),
		gulp.dest(config.styles.dest),
		//csslint(),
		//csslint.reporter()
		gulpif(browserSync.active, browserSync.reload({ stream: true }))
  	]);
  combined.on('error', console.error.bind(console));
  return combined;
});
