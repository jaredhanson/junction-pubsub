var util = require('util');


module.exports = function subscribe(options) {
  options = options || {};
  
  return function subscribe(stanza, next) {
    if (!stanza.is('iq')) { return next(); }
    var pubsub = stanza.getChild('pubsub', 'http://jabber.org/protocol/pubsub');
    if (!pubsub) { return next(); }
    var subscribe = pubsub.getChild('subscribe');
    if (!subscribe) { return next(); }
    
    stanza.action = 'subscribe';
    stanza.node = subscribe.attrs.node;
    stanza.jid = subscribe.attrs.jid;
    
    next();
  }
}
