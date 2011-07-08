var vows = require('vows');
var assert = require('assert');
var PubSub = require('junction-pubsub/elements/pubsub');


vows.describe('PubSub').addBatch({

  'when constructed': {
    topic: function() {
      return new PubSub();
    },
    
    'should build correct XML string': function(pubsub) {
      assert.equal(pubsub.toXML().toString(), '<pubsub xmlns="http://jabber.org/protocol/pubsub"/>');
    },
  },

}).export(module);
