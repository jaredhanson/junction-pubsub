/**
 * Module dependencies.
 */
var util = require('util')
  , Element = require('junction').elements.Element;

/**
 * Initialize a new `Publish` element.
 *
 * @param {String} node
 * @api public
 */
function Publish(node) {
  Element.call(this, 'publish', 'http://jabber.org/protocol/pubsub');
  this.node = node;
}

/**
 * Inherit from `Element`.
 */
util.inherits(Publish, Element);

/**
 * Build XML attributes.
 *
 * @api private
 */
Publish.prototype.xmlAttributes = function() {
  return { node: this.node };
}


/**
 * Expose `Publish`.
 */
exports = module.exports = Publish;
