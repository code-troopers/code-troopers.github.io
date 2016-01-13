'use strict';

var config = require('../config');
var isProd = require('../util/isProduction');
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('watch', ['browserSync'], function () {
    if (isProd()) {
        gulp.watch([
            config.images.src,
            config.styles.src,
            config.scripts.src,
            config.jekyll.src
        ], ['build']);
    } else {
        gulp.watch(config.images.src, ['images']);
        gulp.watch(config.styles.src, ['styles']);
        gulp.watch(config.scripts.src, ['scripts']);
        gulp.watch(config.jekyll.src, ['jekyll']);
    }
});
