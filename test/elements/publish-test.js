var vows = require('vows');
var assert = require('assert');
var Publish = require('junction-pubsub/elements/publish');


vows.describe('Publish').addBatch({

  'when constructed with a node': {
    topic: function() {
      return new Publish('princely_musings');
    },
    
    'should have a node': function (publish) {
      assert.equal(publish.node, 'princely_musings');
    },
    'should build correct XML string': function(publish) {
      assert.equal(publish.toXML().toString(), '<publish node="princely_musings" xmlns="http://jabber.org/protocol/pubsub"/>');
    },
  },

}).export(module);
