/**
 * Module dependencies.
 */
var util = require('util')
  , StanzaError = require('junction').StanzaError;


/**
 * Parse subscribe requests.
 *
 * This middleware parses requests to subscribe to a node.  `stanza.action`
 * indicates the action, in this case always _subscribe_.  `stanza.node`
 * indicates the node to which the entity wishes to subscribe.  `stanza.jid`
 * specifies the exact XMPP address to be used as the subscribed JID.
 *
 * Junction/PubSub activates this middleware automatically.  Your program should
 * not need to use it manually.
 *
 * References:
 * - [XEP-0060: Publish-Subscribe](http://xmpp.org/extensions/xep-0060.html#subscriber-subscribe)
 *
 * @return {Function}
 * @api private
 */

module.exports = function subscribeParser() {
  
  return function subscribeParser(stanza, next) {
    if (!stanza.is('iq')) { return next(); }
    var pubsub = stanza.getChild('pubsub', 'http://jabber.org/protocol/pubsub');
    if (!pubsub) { return next(); }
    var subscribe = pubsub.getChild('subscribe');
    if (!subscribe) { return next(); }
    
    if (stanza.type != 'set') {
      return next(new StanzaError("Subscribe request must be an IQ-set stanza.", 'modify', 'bad-request'));
    }
    if (!subscribe.attrs.jid) {
      return next(new StanzaError("Subscribe request must possess a 'jid' attribute.", 'modify', 'bad-request'));
    }
    
    stanza.action = 'subscribe';
    stanza.node = subscribe.attrs.node;
    stanza.jid = subscribe.attrs.jid;
    next();
  }
}
