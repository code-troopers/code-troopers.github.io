'use strict';

var config = require('../config'),
    gulp = require('gulp'),
    cp = require('child_process'),
    gulpif = require('gulp-if'),
    browserSync = require('browser-sync'),
    changed     = require('gulp-changed'),
    isProd = require('../util/isProduction'),
    showDrafts = require('../util/showDrafts'),
    htmlhint = require('gulp-htmlhint'),
    htmlmin = require('gulp-minify-html');

/**
 * Task to build jekyll static site.
 */
gulp.task('jekyll-build', function (done) {
	if(showDrafts()){
		console.log("Build jekyll pages with drafts");
    	return cp.spawn('jekyll', ['build','--drafts'], {stdio: 'inherit'})
    	.on('close', done);
	}else{
		console.log("Build jekyll pages without drafts");
		return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
    	.on('close', done);
	}
});

gulp.task('jekyll', ['jekyll-build'], function(){
	return gulp.src(config.jekyll.generatedSrc)
    	.pipe(changed(config.jekyll.dest))
    	.pipe(gulpif(isProd(),htmlmin()))
		.pipe(gulp.dest(config.jekyll.dest))
        .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));
})
