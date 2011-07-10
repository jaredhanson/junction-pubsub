var vows = require('vows');
var assert = require('assert');
var Retract = require('junction-pubsub/elements/retract');


vows.describe('Retract').addBatch({

  'when constructed with a node': {
    topic: function() {
      return new Retract('princely_musings');
    },
    
    'should have a node': function (retract) {
      assert.equal(retract.node, 'princely_musings');
    },
    'should build correct XML string': function(retract) {
      assert.equal(retract.toXML().toString(), '<retract node="princely_musings" xmlns="http://jabber.org/protocol/pubsub"/>');
    },
  },

}).export(module);
