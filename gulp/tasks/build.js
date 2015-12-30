'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var isProd      = require('../util/isProduction');

gulp.task('build', function(cb) {

  cb = cb || function() {};

  if(isProd()){
  	runSequence(['jekyll','styles','scripts','images'],'rev', cb);
  }else{
  	runSequence(['jekyll','styles','scripts','images'], cb);
  }

});
