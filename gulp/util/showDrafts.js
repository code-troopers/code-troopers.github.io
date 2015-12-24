'use strict';

module.exports = function(){
	return process.argv.slice(2).indexOf('--drafts') != -1;
}