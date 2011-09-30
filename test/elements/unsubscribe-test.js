var vows = require('vows');
var assert = require('assert');
var Unsubscribe = require('junction-pubsub/elements/unsubscribe');


vows.describe('Unsubscribe').addBatch({

  'when constructed with a node and JID': {
    topic: function() {
      return new Unsubscribe('princely_musings', 'francisco@denmark.lit');
    },
    
    'should have a node': function (unsubscribe) {
      assert.equal(unsubscribe.node, 'princely_musings');
    },
    'should have a JID': function (unsubscribe) {
      assert.equal(unsubscribe.jid, 'francisco@denmark.lit');
    },
    'should build correct XML string': function(unsubscribe) {
      assert.equal(unsubscribe.toXML().toString(), '<unsubscribe node="princely_musings" jid="francisco@denmark.lit" xmlns="http://jabber.org/protocol/pubsub"/>');
    },
  },
  
  'when constructed with a node, JID, and subscription ID': {
    topic: function() {
      return new Unsubscribe('princely_musings', 'francisco@denmark.lit', '123-456');
    },
    
    'should have a node': function (unsubscribe) {
      assert.equal(unsubscribe.node, 'princely_musings');
    },
    'should have a JID': function (unsubscribe) {
      assert.equal(unsubscribe.jid, 'francisco@denmark.lit');
    },
    'should have a subscription ID': function (unsubscribe) {
      assert.equal(unsubscribe.subID, '123-456');
    },
    'should build correct XML string': function(unsubscribe) {
      assert.equal(unsubscribe.toXML().toString(), '<unsubscribe node="princely_musings" jid="francisco@denmark.lit" subid="123-456" xmlns="http://jabber.org/protocol/pubsub"/>');
    },
  },

}).export(module);
