var util = require('util');
var StanzaError = require('junction').StanzaError;


module.exports = function unsubscribe(options) {
  options = options || {};
  
  return function unsubscribe(stanza, next) {
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
    next();
  }
}
