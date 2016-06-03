'use script';

module.exports = function () {
    return global.isProd || process.argv.slice(2).indexOf('--prod') != -1;
}