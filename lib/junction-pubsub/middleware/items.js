var util = require('util');
var StanzaError = require('junction').StanzaError;


module.exports = function items(options) {
  options = options || {};
  
  return function items(stanza, next) {
    if (!stanza.is('iq')) { return next(); }
    var pubsub = stanza.getChild('pubsub', 'http://jabber.org/protocol/pubsub');
    if (!pubsub) { return next(); }
    var items = pubsub.getChild('items');
    if (!items) { return next(); }
    
    if (stanza.type != 'get') {
      return next(new StanzaError("Items request must be an IQ-get stanza.", 'modify', 'bad-request'));
    }
    
    // TODO: Implement parsing of items element, and figure out a schema to
    //       encode it's information as properties of the stanza instance.
    
    stanza.action = 'items';
    stanza.node = items.attrs.node;
    next();
  }
}
