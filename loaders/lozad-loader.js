/**
 * Basic loader that remove lozad and data-src attribute when the content is data inlined.
 * @param content html content as string
 */
function lozadLoader(content) {
  this.cacheable && this.cacheable();
  return content.replace(/class=["']lozad["'] data-src="data:/g, 'src="data:');
}

module.exports = lozadLoader;
export default lozadLoader;