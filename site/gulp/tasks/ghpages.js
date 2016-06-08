'use script';

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var config = require('../config');

gulp.task('ghpages', function () {
    return gulp.src(['public/**'])
        .pipe(ghPages({branch: 'test'}));
});
