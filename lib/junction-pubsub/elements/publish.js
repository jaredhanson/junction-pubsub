var util = require('util');
var Element = require('junction').elements.Element;

function Publish(node) {
  Element.call(this, 'publish', 'http://jabber.org/protocol/pubsub');
  this.node = node;
}

util.inherits(Publish, Element);

Publish.prototype.xmlAttributes = function() {
  return { node: this.node };
}


exports = module.exports = Publish;
