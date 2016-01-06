'use strict';

var config = require('../config');
var gulp = require('gulp');

gulp.task('watch', ['browserSync'], function () {
    gulp.watch(config.images.src, ['images']);
    gulp.watch(config.styles.src, ['styles']);
    gulp.watch(config.scripts.src, ['scripts']);
    gulp.watch(config.jekyll.src, ['jekyll']);
});
