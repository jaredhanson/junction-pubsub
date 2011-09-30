var vows = require('vows');
var assert = require('assert');
var Items = require('junction-pubsub/elements/items');


vows.describe('Items').addBatch({

  'when constructed with a node': {
    topic: function() {
      return new Items('princely_musings');
    },
    
    'should have a node': function (items) {
      assert.equal(items.node, 'princely_musings');
    },
    'should build correct XML string': function(items) {
      assert.equal(items.toXML().toString(), '<items node="princely_musings" xmlns="http://jabber.org/protocol/pubsub"/>');
    },
  },
  
  'when a maxItems property is set': {
    topic: function() {
      var items = new Items('princely_musings');
      items.maxItems = 2;
      return items;
    },
    
    'should build correct XML string': function(items) {
      assert.equal(items.toXML().toString(), '<items node="princely_musings" max_items="2" xmlns="http://jabber.org/protocol/pubsub"/>');
    },
  },

}).export(module);
