function Route(action, node, fn, options) {
  options = options || {};
  this.action = action;
  this.node = node;
  this.callback = fn;
  this.middleware = options.middleware;
}

Route.prototype.match = function(node) {
  // TODO: Implement regex-style matching.
  return this.node == node;
};


module.exports = Route;
