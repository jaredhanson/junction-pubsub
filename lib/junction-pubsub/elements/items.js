/**
 * Module dependencies.
 */
var util = require('util')
  , Element = require('junction').elements.Element;

/**
 * Initialize a new `Items` element.
 *
 * @param {String} node
 * @api public
 */
function Items(node) {
  Element.call(this, 'items', 'http://jabber.org/protocol/pubsub');
  this.node = node;
}

/**
 * Inherit from `Element`.
 */
util.inherits(Items, Element);

/**
 * Build XML attributes.
 *
 * @api private
 */
Items.prototype.xmlAttributes = function() {
  return { node: this.node };
}


/**
 * Expose `Items`.
 */
exports = module.exports = Items;
