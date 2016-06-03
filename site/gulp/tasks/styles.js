'use strict';

var config = require('../config');
var isProd = require('../util/isProduction');
var gulp = require('gulp');
var less = require('gulp-less');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var cleancss = require('gulp-clean-css');

gulp.task('styles', function () {
    del(config.styles.dest);
    return gulp.src(config.styles.src)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concatCss('style.css'))
        .pipe(autoprefixer("last 1 version"))
        .pipe(gulpif(isProd(), cleancss({advanced:false})))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.styles.dest));
});
