'use strict';

var config = require("../config");
var gulp = require("gulp");
var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");

gulp.task("revision", function () {
    return gulp.src(config.rev.src)
        .pipe(rev())
        .pipe(gulp.dest(config.rev.dest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(""));
})

gulp.task("rev", ["revision"], function () {
    var manifest = gulp.src("rev-manifest.json");
    return gulp.src(config.rev.target)
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest(config.rev.dest));
});