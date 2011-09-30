/**
 * Module dependencies.
 */
var util = require('util')
  , StanzaError = require('junction').StanzaError;


/**
 * Parse unsubscribe requests.
 *
 * This middleware parses requests to unsubscribe from a node.  `stanza.action`
 * indicates the action, in this case always _unsubscribe_.  `stanza.node`
 * indicates the node from which the entity wishes to unsubscribe.  `stanza.jid`
 * specifies the XMPP address used as the subscribed JID.  `stanza.subID`
 * specifies the subscription ID in the case where the entity has multiple
 * subscriptions.
 *
 * Junction/PubSub activates this middleware automatically.  Your program should
 * not need to use it manually.
 *
 * References:
 * - [XEP-0060: Publish-Subscribe](http://xmpp.org/extensions/xep-0060.html#subscriber-unsubscribe)
 *
 * @return {Function}
 * @api private
 */
 
module.exports = function unsubscribeParser() {
  
  return function unsubscribeParser(stanza, next) {
    if (!stanza.is('iq')) { return next(); }
    var pubsub = stanza.getChild('pubsub', 'http://jabber.org/protocol/pubsub');
    if (!pubsub) { return next(); }
    var unsubscribe = pubsub.getChild('unsubscribe');
    if (!unsubscribe) { return next(); }
    
    if (stanza.type != 'set') {
      return next(new StanzaError("Unsubscribe request must be an IQ-set stanza.", 'modify', 'bad-request'));
    }
    if (!unsubscribe.attrs.jid) {
      return next(new StanzaError("Unsubscribe request must possess a 'jid' attribute.", 'modify', 'bad-request'));
    }
    
    stanza.action = 'unsubscribe';
    stanza.node = unsubscribe.attrs.node;
    stanza.jid = unsubscribe.attrs.jid;
    stanza.subID = unsubscribe.attrs.subid;
    next();
  }
}
