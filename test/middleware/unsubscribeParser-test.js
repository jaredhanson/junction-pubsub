var vows = require('vows');
var assert = require('assert');
var util = require('util');
var IQ = require('junction').elements.IQ;
var StanzaError = require('junction').StanzaError;
var PubSub = require('junction-pubsub/elements/pubsub');
var Unsubscribe = require('junction-pubsub/elements/unsubscribe');
var Subscribe = require('junction-pubsub/elements/subscribe');
var unsubscribeParser = require('junction-pubsub/middleware/unsubscribeParser');


vows.describe('unsubscribeParser').addBatch({

  'middleware': {
    topic: function() {
      return unsubscribeParser();
    },
    
    'when handling an unsubscribe request': {
      topic: function(unsubscribeParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'francisco@denmark.lit/barracks', 'set');
        var pubsubEl = new PubSub();
        var unsubscribeEl = new Unsubscribe('princely_musings', 'francisco@denmark.lit', '123-456');
        iq.c(pubsubEl).c(unsubscribeEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          unsubscribeParser(iq, next)
        });
      },
      
      'should set action property' : function(err, stanza) {
        assert.equal(stanza.action, 'unsubscribe');
      },
      'should set node property' : function(err, stanza) {
        assert.equal(stanza.node, 'princely_musings');
      },
      'should set a jid property' : function(err, stanza) {
        assert.equal(stanza.jid, 'francisco@denmark.lit');
      },
      'should set a subid property' : function(err, stanza) {
        assert.equal(stanza.subid, '123-456');
      },
    },
    
    'when handling a non-unsubscribe request': {
      topic: function(unsubscribeParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'francisco@denmark.lit/barracks', 'set');
        var pubsubEl = new PubSub();
        var subscribeEl = new Subscribe('princely_musings', 'francisco@denmark.lit');
        iq.c(pubsubEl).c(subscribeEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          unsubscribeParser(iq, next)
        });
      },
      
      'should not set action property' : function(err, stanza) {
        assert.isUndefined(stanza.action);
      },
      'should not set node property' : function(err, stanza) {
        assert.isUndefined(stanza.node);
      },
      'should not set jid property' : function(err, stanza) {
        assert.isUndefined(stanza.jid);
      },
      'should not set subid property' : function(err, stanza) {
        assert.isUndefined(stanza.subid);
      },
    },
    
    'when handling a IQ-get unsubscribe request': {
      topic: function(unsubscribeParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'francisco@denmark.lit/barracks', 'get');
        var pubsubEl = new PubSub();
        var unsubscribeEl = new Unsubscribe('princely_musings', 'francisco@denmark.lit');
        iq.c(pubsubEl).c(unsubscribeEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          unsubscribeParser(iq, next)
        });
      },
      
      'should indicate an error' : function(err, stanza) {
        assert.instanceOf(err, StanzaError);
        assert.equal(err.type, 'modify');
        assert.equal(err.condition, 'bad-request');
      },
    },
    
    'when handling an unsubscribe request without a jid attribute': {
      topic: function(unsubscribeParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'francisco@denmark.lit/barracks', 'get');
        var pubsubEl = new PubSub();
        var unsubscribeEl = new Unsubscribe('princely_musings');
        iq.c(pubsubEl).c(unsubscribeEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          unsubscribeParser(iq, next)
        });
      },
      
      'should indicate an error' : function(err, stanza) {
        assert.instanceOf(err, StanzaError);
        assert.equal(err.type, 'modify');
        assert.equal(err.condition, 'bad-request');
      },
    },
    
    'when handling an IQ stanza that is not a publish-subscribe stanza': {
      topic: function(unsubscribeParser) {
        var self = this;
        var iq = new IQ('romeo@example.net', 'juliet@example.com', 'get');
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          unsubscribeParser(iq, next)
        });
      },
      
      'should not set action property' : function(err, stanza) {
        assert.isUndefined(stanza.action);
      },
      'should not set node property' : function(err, stanza) {
        assert.isUndefined(stanza.node);
      },
      'should not set jid property' : function(err, stanza) {
        assert.isUndefined(stanza.jid);
      },
      'should not set subid property' : function(err, stanza) {
        assert.isUndefined(stanza.subid);
      },
    },
  },

}).export(module);
