'use script';

var config = require('../config');
var isProd = require('../util/isProduction');

var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', ['ie8'], function () {
    del(config.scripts.dest + '/scripts.js');
    return gulp.src(config.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(gulpif(isProd(), uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('ie8', function () {
    del(config.scripts.dest + '/ie8.js');
    return gulp.src(config.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(concat('ie8.js'))
        .pipe(gulpif(isProd(), uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.scripts.dest));
});