var vows = require('vows');
var assert = require('assert');
var util = require('util');
var IQ = require('junction').elements.IQ;
var StanzaError = require('junction').StanzaError;
var PubSub = require('junction-pubsub/elements/pubsub');
var Unsubscribe = require('junction-pubsub/elements/unsubscribe');
var Subscribe = require('junction-pubsub/elements/subscribe');
var unsubscribe = require('junction-pubsub/middleware/unsubscribe');


vows.describe('unsubscribe').addBatch({

  'middleware': {
    topic: function() {
      return unsubscribe();
    },
    
    'when handling an unsubscribe request': {
      topic: function(unsubscribe) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'francisco@denmark.lit/barracks', 'set');
        var pubsubEl = new PubSub();
        var unsubscribeEl = new Unsubscribe('princely_musings', 'francisco@denmark.lit');
        iq.c(pubsubEl).c(unsubscribeEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          unsubscribe(iq, next)
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
    },
    
    'when handling a non-unsubscribe request': {
      topic: function(unsubscribe) {
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
          unsubscribe(iq, next)
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
    },
    
    'when handling a non-IQ-set unsubscribe request': {
      topic: function(unsubscribe) {
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
          unsubscribe(iq, next)
        });
      },
      
      'should indicate an error' : function(err, stanza) {
        assert.instanceOf(err, StanzaError);
        assert.equal(err.type, 'modify');
        assert.equal(err.condition, 'bad-request');
      },
    },
    
    'when handling an unsubscribe request without a jid attribute': {
      topic: function(unsubscribe) {
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
          unsubscribe(iq, next)
        });
      },
      
      'should indicate an error' : function(err, stanza) {
        assert.instanceOf(err, StanzaError);
        assert.equal(err.type, 'modify');
        assert.equal(err.condition, 'bad-request');
      },
    },
    
    'when handling an IQ stanza that is not a publish-subscribe stanza': {
      topic: function(unsubscribe) {
        var self = this;
        var iq = new IQ('romeo@example.net', 'juliet@example.com', 'get');
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          unsubscribe(iq, next)
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
    },
  },

}).export(module);
