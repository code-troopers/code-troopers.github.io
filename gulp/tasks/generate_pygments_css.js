'use strict';

var config = require('../config'),
    gulp = require('gulp'),
    fs = require('fs'),
    cp = require('child_process');

/**
 * Task to generate pygments css file
 */
gulp.task('generate_pygments_css', function (done) {
  var pygmentsCSSPath = './app/styles/pygments.css';
  var pygmentsCSS = fs.createWriteStream(pygmentsCSSPath);
	var args = ['-S', 'monokai', '-f', 'html', '-O', 'classprefix=tok-'];
  var pygmentize = cp.spawn('pygmentize', args);
  pygmentize.stdout.pipe(pygmentsCSS);
  return pygmentize
    	.on('close', done);
});
