'use strict';

var isProd = require('../util/isProduction');
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function (cb) {
    cb = cb || function () {
        };
    var buildTasks = ['clean','styles', 'scripts'];
    runSequence(buildTasks, cb);
});
