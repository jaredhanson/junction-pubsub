var util = require('util');


module.exports = function unsubscribe(options) {
  options = options || {};
  
  return function unsubscribe(stanza, next) {
    if (!stanza.is('iq')) { return next(); }
    var pubsub = stanza.getChild('pubsub', 'http://jabber.org/protocol/pubsub');
    if (!pubsub) { return next(); }
    var unsubscribe = pubsub.getChild('unsubscribe');
    if (!unsubscribe) { return next(); }
    
    stanza.action = 'unsubscribe';
    stanza.node = unsubscribe.attrs.node;
    stanza.jid = unsubscribe.attrs.jid;
    
    next();
  }
}
