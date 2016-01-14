'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var isProd = require('../util/isProduction');

gulp.task('build', function (cb) {
    cb = cb || function () {
        };
    var buildTasks = ['jekyll', 'styles', 'scripts', 'images'];
    if (isProd()) {
        console.log("Build with minifications");
        runSequence(buildTasks, 'rev', cb);
    } else {
        console.log("Build without minifications");
        runSequence(buildTasks, cb);
    }

});
