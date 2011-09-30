/**
 * Module dependencies.
 */
var util = require('util')
  , StanzaError = require('junction').StanzaError;


/**
 * Parse retract requests.
 *
 * This middleware parses requests to delete an item from a node.
 * `stanza.action` indicates the action, in this case always _retract_.
 * `stanza.node` indicates the node from which the entity wishes to delete the
 * item.  `stanza.itemID` indicates the item ID of the item to delete.
 *
 * Junction/PubSub activates this middleware automatically.  Your program should
 * not need to use it manually.
 *
 * References:
 * - [XEP-0060: Publish-Subscribe](http://xmpp.org/extensions/xep-0060.html#publisher-delete)
 *
 * @return {Function}
 * @api private
 */
module.exports = function retractParser() {
  
  return function retractParser(stanza, next) {
    if (!stanza.is('iq')) { return next(); }
    var pubsub = stanza.getChild('pubsub', 'http://jabber.org/protocol/pubsub');
    if (!pubsub) { return next(); }
    var retract = pubsub.getChild('retract');
    if (!retract) { return next(); }
    var item = retract.getChild('item');
    
    if (stanza.type != 'set') {
      return next(new StanzaError("Retract request must be an IQ-set stanza.", 'modify', 'bad-request'));
    }
    if (!retract.attrs.node) {
      return next(new StanzaError("Retract request must possess a 'node' attribute.", 'modify', 'bad-request'));
    }
    
    stanza.action = 'retract';
    stanza.node = retract.attrs.node;
    next();
  }
}
