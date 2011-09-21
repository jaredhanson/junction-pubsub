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
  return { node: this.node };
}


/**
 * Expose `Retract`.
 */
exports = module.exports = Retract;
