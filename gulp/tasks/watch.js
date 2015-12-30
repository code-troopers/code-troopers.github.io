'use strict';

var config        = require('../config');
var gulp          = require('gulp');
var isProd		  = require('../util/isProduction');

gulp.task('watch', ['browserSync'], function() {	
  // Scripts are automatically watched and rebundled by Watchify inside Browserify task
  gulp.watch(config.images.src,  ['images']);
  gulp.watch(config.styles.src,  ['styles']);
  gulp.watch(config.scripts.src,  ['scripts']);
  gulp.watch(config.jekyll.src, ['jekyll']);
});
