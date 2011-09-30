/**
 * Module dependencies.
 */
var util = require('util')
  , StanzaError = require('junction').StanzaError;


/**
 * Parse items requests.
 *
 * This middleware parses requests to retrieve items from a node.
 * `stanza.action` indicates the action, in this case always _items_.
 * `stanza.node` indicates the node from which the entity wishes to retrieve
 * items.
 *
 * Junction/PubSub activates this middleware automatically.  Your program should
 * not need to use it manually.
 *
 * References:
 * - [XEP-0060: Publish-Subscribe](http://xmpp.org/extensions/xep-0060.html#subscriber-retrieve)
 *
 * @return {Function}
 * @api private
 */
module.exports = function itemsParser() {
  
  return function itemsParser(stanza, next) {
    if (!stanza.is('iq')) { return next(); }
    if (stanza.type == 'result' || stanza.type == 'error') { return next(); }
    var pubsub = stanza.getChild('pubsub', 'http://jabber.org/protocol/pubsub');
    if (!pubsub) { return next(); }
    var items = pubsub.getChild('items');
    if (!items) { return next(); }
    
    if (stanza.type != 'get') {
      return next(new StanzaError("Items request must be an IQ-get stanza.", 'modify', 'bad-request'));
    }
    
    stanza.action = 'items';
    stanza.node = items.attrs.node;
    if (items.attrs.max_items) {
      stanza.maxItems = parseInt(items.attrs.max_items);
    }
    next();
  }
}
