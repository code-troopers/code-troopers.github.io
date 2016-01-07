'use strict';

var config = require('../config');
var isProd = require('../util/isProduction');
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('watch', ['browserSync'], function () {
    gulp.watch(config.images.src, ['images']);
    if (isProd()) {
        gulp.watch(config.styles.src, function (event) {
            runSequence(['styles', 'jekyll'], 'rev');
        });
        gulp.watch(config.scripts.src, ['scripts', 'rev']);
    } else {
        gulp.watch(config.styles.src, ['styles']);
        gulp.watch(config.scripts.src, ['scripts']);
    }
    gulp.watch(config.jekyll.src, ['jekyll']);
});
