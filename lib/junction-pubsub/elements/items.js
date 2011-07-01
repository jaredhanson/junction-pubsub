var util = require('util');
var Element = require('junction').elements.Element;

function Items(node) {
  Element.call(this, 'items', 'http://jabber.org/protocol/pubsub');
  this.node = node;
}

util.inherits(Items, Element);

Items.prototype.xmlAttributes = function() {
  return { node: this.node };
}


exports = module.exports = Items;
