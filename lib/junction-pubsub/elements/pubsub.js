var util = require('util');
var Element = require('junction').elements.Element;

function PubSub(node) {
  Element.call(this, 'pubsub', 'http://jabber.org/protocol/pubsub');
}

util.inherits(PubSub, Element);

PubSub.prototype.xmlAttributes = function() {
  return {};
}


exports = module.exports = PubSub;
