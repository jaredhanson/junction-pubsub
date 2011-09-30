var util = require('util');
var StanzaError = require('junction').StanzaError;


module.exports = function retractParser() {
  
  return function retractParser(stanza, next) {
    if (!stanza.is('iq')) { return next(); }
    var pubsub = stanza.getChild('pubsub', 'http://jabber.org/protocol/pubsub');
    if (!pubsub) { return next(); }
    var retract = pubsub.getChild('retract');
    if (!retract) { return next(); }
    
    if (stanza.type != 'set') {
      return next(new StanzaError("Retract request must be an IQ-set stanza.", 'modify', 'bad-request'));
    }
    
    stanza.action = 'retract';
    stanza.node = retract.attrs.node;
    next();
  }
}
