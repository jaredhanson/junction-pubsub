var vows = require('vows');
var assert = require('assert');
var Item = require('junction-pubsub/elements/item');


vows.describe('Item').addBatch({

  'when constructed without an ID': {
    topic: function() {
      return new Item();
    },
    
    'should not have an ID': function (item) {
      assert.isUndefined(item.id);
    },
    'should build correct XML string': function(item) {
      assert.equal(item.toXML().toString(), '<item xmlns="http://jabber.org/protocol/pubsub"/>');
    },
  },

  'when constructed with an ID': {
    topic: function() {
      return new Item('bnd81g37d61f49fgn581');
    },
    
    'should have an ID': function (item) {
      assert.equal(item.id, 'bnd81g37d61f49fgn581');
    },
    'should build correct XML string': function(item) {
      assert.equal(item.toXML().toString(), '<item id="bnd81g37d61f49fgn581" xmlns="http://jabber.org/protocol/pubsub"/>');
    },
  },

}).export(module);
