'use strict';

var config = require('../config');
var combiner = require('stream-combiner2');
var gulp = require('gulp');
var less = require('gulp-less');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var nano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var isProd = require('../util/isProduction');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');

gulp.task('styles', function () {
    del(['public/styles/**/*']);
    var combined = combiner.obj([
        gulp.src(config.styles.src),
        gulpif(!global.isDeploy, sourcemaps.init()),
        less(),
        concatCss('style.css'),
        autoprefixer("last 1 version"),
        gulpif(isProd(), nano()),
        gulpif(!global.isDeploy, sourcemaps.write()),
        gulp.dest(config.styles.dest),
        gulpif(browserSync.active, browserSync.reload({stream: true}))
    ]);
    combined.on('error', console.error.bind(console));
    return combined;
});
