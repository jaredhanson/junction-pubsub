var util = require('util');
var Element = require('junction').elements.Element;

function Subscribe(node, jid) {
  Element.call(this, 'subscribe', 'http://jabber.org/protocol/pubsub');
  this.node = node;
  this.jid = jid;
}

util.inherits(Subscribe, Element);

Subscribe.prototype.xmlAttributes = function() {
  return { node: this.node, jid: this.jid };
}


exports = module.exports = Subscribe;
