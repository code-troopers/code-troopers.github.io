'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var isProd      = require('../util/isProduction');

gulp.task('build', function(cb) {

  cb = cb || function() {};

  if(isProd()){
  	console.log("Build with minifications");
  	runSequence(['jekyll','styles','scripts','images'],'rev', cb);
  }else{
  	console.log("Build without minifications");
  	runSequence(['jekyll','styles','scripts','images'], cb);
  }

});
