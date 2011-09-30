/**
 * Module dependencies.
 */
var util = require('util')
  , Element = require('junction').elements.Element;

/**
 * Initialize a new `Retract` element.
 *
 * @param {String} node
 * @api public
 */
function Retract(node) {
  Element.call(this, 'retract', 'http://jabber.org/protocol/pubsub');
  this.node = node;
}

/**
 * Inherit from `Element`.
 */
util.inherits(Retract, Element);

/**
 * Build XML attributes.
 *
 * @api private
 */
Retract.prototype.xmlAttributes = function() {
  var attrs = { node: this.node };
  if (this.notify) { attrs.notify = 'true' };
  return attrs;
}


/**
 * Expose `Retract`.
 */
exports = module.exports = Retract;
