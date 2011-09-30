/**
 * Module dependencies.
 */
var util = require('util')
  , StanzaError = require('junction').StanzaError;


/**
 * Parse publish requests.
 *
 * This middleware parses requests to publish an item to a node.
 * `stanza.action` indicates the action, in this case always _publish_.
 * `stanza.node` indicates the node to which the entity wishes to publish
 * the item.
 *
 * Junction/PubSub activates this middleware automatically.  Your program should
 * not need to use it manually.
 *
 * References:
 * - [XEP-0060: Publish-Subscribe](http://xmpp.org/extensions/xep-0060.html#publisher-publish)
 *
 * @return {Function}
 * @api private
 */
module.exports = function publishParser() {
  
  return function publishParser(stanza, next) {
    if (!stanza.is('iq')) { return next(); }
    if (stanza.type == 'result' || stanza.type == 'error') { return next(); }
    var pubsub = stanza.getChild('pubsub', 'http://jabber.org/protocol/pubsub');
    if (!pubsub) { return next(); }
    var publish = pubsub.getChild('publish');
    if (!publish) { return next(); }
    
    if (stanza.type != 'set') {
      return next(new StanzaError("Publish request must be an IQ-set stanza.", 'modify', 'bad-request'));
    }
    if (!publish.attrs.node) {
      return next(new StanzaError("Publish request must possess a 'node' attribute.", 'modify', 'bad-request'));
    }
    
    stanza.action = 'publish';
    stanza.node = publish.attrs.node;
    next();
  }
}
