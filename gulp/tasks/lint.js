'use script';

var config = require('../config');
var gulp = require('gulp');
var combiner = require('stream-combiner2');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');
var less = require('gulp-less');
var html5Lint = require('gulp-html5-lint');

gulp.task('lint-scripts', function () {
    var combined = combiner.obj([
        gulp.src(config.scripts.src),
        jshint(),
        jshint.reporter()
    ]);
    combined.on('error', console.error.bind(console));
    return combined;
});

gulp.task('lint-styles', function () {
    var combined = combiner.obj([
        gulp.src(config.styles.src),
        less(),
        csslint(),
        csslint.reporter()
    ]);
    combined.on('error', console.error.bind(console));
    return combined;
});

gulp.task('lint-html', function () {
    var combined = combiner.obj([
        gulp.src(config.generated.root + '/**/*.html'),
        html5Lint()
    ]);
    combined.on('error', console.error.bind(console));
    return combined;
});

