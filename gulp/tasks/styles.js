'use strict';

var config       = require('../config');
var combiner = require('stream-combiner2');
var gulp         = require('gulp');
var less         = require('gulp-less');
var gulpif       = require('gulp-if');
var browserSync  = require('browser-sync');
var minifycss       = require('gulp-minify-css');	
var csslint      = require('gulp-csslint');
var autoprefixer = require('gulp-autoprefixer');
var isProd    = require('../util/isProduction');

gulp.task('styles', function () {
  var combined = combiner.obj([
		gulp.src(config.styles.src),
		less(),
		autoprefixer("last 1 version"),
		gulpif(isProd() , minifycss({compatibility: 'ie8'})),
		gulp.dest(config.styles.dest),
		//csslint(),
		//csslint.reporter()
		gulpif(browserSync.active, browserSync.reload({ stream: true }))
  	]);
  combined.on('error', console.error.bind(console));
  return combined;
});
