'use strict';

var gulp = require('gulp'),
    config = require('../config'),
    deploy = require('gulp-deploy-git');

gulp.task('deploy', ['prod'], function() {
  return gulp.src(config.dist.root + '/**/*')
  .pipe(deploy({
    repository: 'ssh://55b8ee7067c989167400001b@10.34.56.121/~/git/myzeonline.git/',
    branches:   ['master']
  }));
});
