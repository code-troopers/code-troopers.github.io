'use strict';

var config = require('../config'),
    gulp = require('gulp'),
    cp = require('child_process');

/**
 * Task to build jekyll static site.
 */
gulp.task('pygments_styles', function (done) {
  //pygments:{
  //  command: '$(dirname $(gem which pygments.rb))/../vendor/pygments-main/pygmentize -S monokai -f html -O classprefix=tok- > <%= yeoman.app%>/styles/pygments.css'
  //}
	var args = ['-S', 'monokai', '-f', 'html', '-O', 'classprefix=tok-'];
	return cp.spawn('pygmentize', args, {stdio: 'inherit'})
    	.on('close', done);
});
