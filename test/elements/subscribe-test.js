var vows = require('vows');
var assert = require('assert');
var Subscribe = require('junction-pubsub/elements/subscribe');


vows.describe('Publish').addBatch({

  'when constructed with a node and JID': {
    topic: function() {
      return new Subscribe('princely_musings', 'francisco@denmark.lit');
    },
    
    'should have a node': function (publish) {
      assert.equal(publish.node, 'princely_musings');
    },
    'should have a JID': function (publish) {
      assert.equal(publish.jid, 'francisco@denmark.lit');
    },
    'should build correct XML string': function(publish) {
      assert.equal(publish.toXML().toString(), '<subscribe node="princely_musings" jid="francisco@denmark.lit" xmlns="http://jabber.org/protocol/pubsub"/>');
    },
  },

}).export(module);
