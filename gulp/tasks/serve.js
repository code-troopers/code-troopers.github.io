'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('serve', function (cb) {
    cb = cb || function () {
        };
    runSequence('build', 'watch', cb);
});
