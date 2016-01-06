'use strict';

var gulp = require("gulp");
var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");
var config = require("../config");

gulp.task("revision", function () {
    return gulp.src([config.dist.root + "/**/*.css", config.dist.root + "/**/*.js"])
        .pipe(rev())
        .pipe(gulp.dest(config.dist.root))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.dist.root))
})

gulp.task("rev", ["revision"], function () {
    var manifest = gulp.src(config.dist.root + "/rev-manifest.json");
    return gulp.src([config.dist.root + "/**/*.html"])
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest(config.dist.root));
});