var util = require('util');
var StanzaError = require('junction').StanzaError;


module.exports = function publishParser() {
  
  return function publishParser(stanza, next) {
    if (!stanza.is('iq')) { return next(); }
    var pubsub = stanza.getChild('pubsub', 'http://jabber.org/protocol/pubsub');
    if (!pubsub) { return next(); }
    var publish = pubsub.getChild('publish');
    if (!publish) { return next(); }
    
    if (stanza.type != 'set') {
      return next(new StanzaError("Publish request must be an IQ-set stanza.", 'modify', 'bad-request'));
    }
    
    stanza.action = 'publish';
    stanza.node = publish.attrs.node;
    next();
  }
}
