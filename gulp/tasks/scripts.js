'use script';

var config       = require('../config');
var gulp         = require('gulp');
var combiner = require('stream-combiner2');
var concat       = require('gulp-concat');
var gulpif       = require('gulp-if');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var uglify       = require('gulp-uglify');
var jshint       = require('gulp-jshint');
var isProd    = require('../util/isProduction');
var del          = require('del');

gulp.task('scripts', ['ie8'], function () {
	var combined = combiner.obj([
			gulp.src(config.scripts.src),
			concat('scripts.js'),
			//jshint(),
			//jshint.reporter(),
			gulpif(isProd(), uglify()),
			gulp.dest(config.scripts.dest),
			gulpif(browserSync.active, browserSync.reload({ stream: true }))	
		]);
	combined.on('error', console.error.bind(console));
	return combined;
});

gulp.task('ie8', function () {
	del(config.scripts.dest)
	var combined = combiner.obj([
			gulp.src(config.scripts.srcIE8),
			concat('ie8.js'),
			gulpif(isProd(), uglify()),
			gulp.dest(config.scripts.dest),	
			gulpif(browserSync.active, browserSync.reload({ stream: true }))		
		]);
	combined.on('error', console.error.bind(console));
	return combined;
});