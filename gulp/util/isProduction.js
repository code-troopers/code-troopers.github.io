'use script';

module.exports = function(){
	return process.argv.slice(2).indexOf('--prod') != -1;
}