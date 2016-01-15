'use strict';

var config = require('../config');
var changed = require('gulp-changed');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var isProd = require('../util/isProduction');
var imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");

gulp.task('images', function () {
    return gulp.src(config.images.src)
        .pipe(gulpif(!isProd(), changed(config.images.dest)))
        // Images are now compress on repo (see task below)
        // .pipe(imagemin())
        .pipe(gulp.dest(config.images.dest))
        .pipe(gulpif(browserSync.active, browserSync.reload({stream: true, once: true})));
});

gulp.task('compress-images', ['thumbnail-images'], function () {
    return gulp.src(config.images.src)
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest(config.images.destSrc))
});
gulp.task('thumbnail-images', function () {
    return gulp.src(config.images.posts.src)
         .pipe(imageResize({ height : 200, format: 'png', imageMagick: true}))
         .pipe(rename(function (path) { path.basename += "_min"; }))
         .pipe(gulp.dest(config.images.posts.destSrc))
});
