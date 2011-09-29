var util = require('util');
var StanzaError = require('junction').StanzaError;


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
