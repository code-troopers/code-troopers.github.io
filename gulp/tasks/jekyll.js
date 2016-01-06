'use strict';

var config = require('../config'),
    gulp = require('gulp'),
    cp = require('child_process'),
    gulpif = require('gulp-if'),
    browserSync = require('browser-sync'),
    changed = require('gulp-changed'),
    isProd = require('../util/isProduction'),
    showDrafts = require('../util/showDrafts'),
    htmlmin = require('gulp-htmlmin');

/**
 * Task to build jekyll static site.
 */
gulp.task('jekyll-build', function (cb) {
    var jekyllArgs = ['build'];
    if (showDrafts()) {
        console.log("Build jekyll pages with drafts");
        jekyllArgs.push('--drafts');
    } else {
        console.log("Build jekyll pages without drafts");
    }
    return cp.spawn('jekyll', jekyllArgs, {stdio: 'inherit'}).on("close", cb);
});

gulp.task('jekyll', ['jekyll-build'], function () {
    return gulp.src(config.jekyll.generatedSrc)
        .pipe(changed(config.jekyll.dest))
        .pipe(gulpif(isProd(), gulpif('*.html', htmlmin({collapseWhitespace: true}))))
        .pipe(gulp.dest(config.jekyll.dest))
        .pipe(gulpif(browserSync.active, browserSync.reload({stream: true})));
})
