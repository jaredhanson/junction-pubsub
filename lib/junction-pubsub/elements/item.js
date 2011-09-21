/**
 * Module dependencies.
 */
var util = require('util')
  , Element = require('junction').elements.Element;

/**
 * Initialize a new `Item` element.
 *
 * @param {String} id
 * @api public
 */
function Item(id) {
  Element.call(this, 'item', 'http://jabber.org/protocol/pubsub');
  this.id = id;
}

/**
 * Inherit from `Element`.
 */
util.inherits(Item, Element);

/**
 * Build XML attributes.
 *
 * @api private
 */
Item.prototype.xmlAttributes = function() {
  return { id: this.id };
}


/**
 * Expose `Item`.
 */
exports = module.exports = Item;
