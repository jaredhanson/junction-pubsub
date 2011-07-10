var util = require('util');
var Element = require('junction').elements.Element;

function Item(id) {
  Element.call(this, 'item', 'http://jabber.org/protocol/pubsub');
  this.id = id;
}

util.inherits(Item, Element);

Item.prototype.xmlAttributes = function() {
  return { id: this.id };
}


exports = module.exports = Item;
