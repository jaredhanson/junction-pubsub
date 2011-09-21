/**
 * Module dependencies.
 */
var util = require('util')
  , Element = require('junction').elements.Element;

/**
 * Initialize a new `PubSub` element.
 *
 * @api public
 */
function PubSub() {
  Element.call(this, 'pubsub', 'http://jabber.org/protocol/pubsub');
}

/**
 * Inherit from `Element`.
 */
util.inherits(PubSub, Element);

/**
 * Build XML attributes.
 *
 * @api private
 */
PubSub.prototype.xmlAttributes = function() {
  return {};
}


/**
 * Expose `PubSub`.
 */
exports = module.exports = PubSub;
