var config = require('../config');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");

gulp.task('images.compress', function () {
    return gulp.src(config.images.src)
        .pipe(changed(config.images.dest))
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest(config.images.dest));
});

gulp.task('images.thumbnail', function () {
    return gulp.src(config.images.posts.src)
        .pipe(rename(function (path) { path.basename += "_min"; }))
        .pipe(changed(config.images.posts.dest))
        .pipe(imageResize({ height : 200, format: 'png', imageMagick: true}))
        .pipe(gulp.dest(config.images.posts.dest));
});