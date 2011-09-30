/**
 * Module dependencies.
 */
var util = require('util')
  , Element = require('junction').elements.Element;

/**
 * Initialize a new `Unsubscribe` element.
 *
 * @param {String} node
 * @param {JID|String} jid
 * @api public
 */
function Unsubscribe(node, jid, subID) {
  Element.call(this, 'unsubscribe', 'http://jabber.org/protocol/pubsub');
  this.node = node;
  this.jid = jid;
  this.subID = subID;
}

/**
 * Inherit from `Element`.
 */
util.inherits(Unsubscribe, Element);

/**
 * Build XML attributes.
 *
 * @api private
 */
Unsubscribe.prototype.xmlAttributes = function() {
  return { node: this.node, jid: this.jid, subid: this.subID };
}


/**
 * Expose `Unsubscribe`.
 */
exports = module.exports = Unsubscribe;
