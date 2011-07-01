var util = require('util');


module.exports = function publish(options) {
  options = options || {};
  
  return function publish(stanza, next) {
    if (!stanza.is('iq')) { return next(); }
    var pubsub = stanza.getChild('pubsub', 'http://jabber.org/protocol/pubsub');
    if (!pubsub) { return next(); }
    var publish = pubsub.getChild('publish');
    if (!publish) { return next(); }
    
    stanza.action = 'publish';
    stanza.node = publish.attrs.node;
    
    next();
  }
}
