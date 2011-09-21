/**
 * Module dependencies.
 */
var util = require('util')
  , Element = require('junction').elements.Element;

/**
 * Initialize a new `Subscribe` element.
 *
 * @param {String} node
 * @param {JID|String} jid
 * @api public
 */
function Subscribe(node, jid) {
  Element.call(this, 'subscribe', 'http://jabber.org/protocol/pubsub');
  this.node = node;
  this.jid = jid;
}

/**
 * Inherit from `Element`.
 */
util.inherits(Subscribe, Element);

/**
 * Build XML attributes.
 *
 * @api private
 */
Subscribe.prototype.xmlAttributes = function() {
  return { node: this.node, jid: this.jid };
}


/**
 * Expose `Subscribe`.
 */
exports = module.exports = Subscribe;
