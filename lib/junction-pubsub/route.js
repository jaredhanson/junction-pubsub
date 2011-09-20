/**
 * Initialize a new `Route` with the given `action`, `node`, an array of
 * `callbacks` and `options`.
 *
 * Options:
 *
 *   - `sensitive`  enable case-sensitive routes
 *   - `strict`     enable strict matching for trailing slashes
 *
 * @param {String} action
 * @param {String} node
 * @param {Array} callbacks
 * @param {Object} options.
 * @api private
 */
function Route(action, node, callbacks, options) {
  options = options || {};
  this.action = action;
  this.node = node;
  this.callbacks = callbacks;
  this.regexp = normalize(node
    , this.keys = []
    , options.sensitive
    , options.strict);
}

/**
 * Check if this route matches `node` and return captures made.
 *
 * @param {String} node
 * @return {Array}
 * @api private
 */
Route.prototype.match = function(node) {
  return this.regexp.exec(node);
};


/**
 * Normalize the given path string,
 * returning a regular expression.
 *
 * An empty array should be passed,
 * which will contain the placeholder
 * key names. For example "/user/:id" will
 * then contain ["id"].
 *
 * @param  {String|RegExp} path
 * @param  {Array} keys
 * @param  {Boolean} sensitive
 * @param  {Boolean} strict
 * @return {RegExp}
 * @api private
 */

function normalize(path, keys, sensitive, strict) {
  if (path === null) return path;
  if (path instanceof RegExp) return path;
  path = path
    .concat(strict ? '' : '/?')
    .replace(/\/\(/g, '(?:/')
    .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional){
      keys.push({ name: key, optional: !! optional });
      slash = slash || '';
      return ''
        + (optional ? '' : slash)
        + '(?:'
        + (optional ? slash : '')
        + (format || '') + (capture || '([^/]+?)') + ')'
        + (optional || '');
    })
    .replace(/([\/.])/g, '\\$1')
    .replace(/\*/g, '(.+)');
  return new RegExp('^' + path + '$', sensitive ? '' : 'i');
}


/**
 * Expose `Route`.
 */
module.exports = Route;
