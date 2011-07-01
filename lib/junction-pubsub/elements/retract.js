var util = require('util');
var Element = require('junction').elements.Element;

function Retract(node) {
  Element.call(this, 'retract', 'http://jabber.org/protocol/pubsub');
  this.node = node;
}

util.inherits(Retract, Element);

Retract.prototype.xmlAttributes = function() {
  return { node: this.node };
}


exports = module.exports = Subscribe;
