'use strict';

var config = require('../config');
var del = require('del');
var gulp = require('gulp');

gulp.task('clean', function () {
    del('public');
});
