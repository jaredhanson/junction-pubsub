var util = require('util');
var Element = require('junction').elements.Element;

function Unsubscribe(node, jid) {
  Element.call(this, 'unsubscribe', 'http://jabber.org/protocol/pubsub');
  this.node = node;
  this.jid = jid;
}

util.inherits(Unsubscribe, Element);

Unsubscribe.prototype.xmlAttributes = function() {
  return { node: this.node, jid: this.jid };
}


exports = module.exports = Unsubscribe;
