'use strict';

var config = require('../config'),
    gulp = require('gulp'),
    cp = require('child_process');

/**
 * Task to build jekyll static site.
 */
gulp.task('jekyll-build', function (done) {
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});
