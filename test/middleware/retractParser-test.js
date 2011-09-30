var vows = require('vows');
var assert = require('assert');
var util = require('util');
var IQ = require('junction').elements.IQ;
var StanzaError = require('junction').StanzaError;
var PubSub = require('junction-pubsub/elements/pubsub');
var Retract = require('junction-pubsub/elements/retract');
var Publish = require('junction-pubsub/elements/publish');
var retractParser = require('junction-pubsub/middleware/retractParser');


vows.describe('retractParser').addBatch({

  'middleware': {
    topic: function() {
      return retractParser();
    },
    
    'when handling a retract request': {
      topic: function(retractParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'hamlet@denmark.lit/elsinore', 'set');
        var pubsubEl = new PubSub();
        var retractEl = new Retract('princely_musings');
        retractEl.c('item', { id: 'bnd81g37d61f49fgn581' });
        iq.c(pubsubEl).c(retractEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          retractParser(iq, next)
        });
      },
      
      'should set action property' : function(err, stanza) {
        assert.equal(stanza.action, 'retract');
      },
      'should set node property' : function(err, stanza) {
        assert.equal(stanza.node, 'princely_musings');
      },
      'should set itemID property' : function(err, stanza) {
        assert.equal(stanza.itemID, 'bnd81g37d61f49fgn581');
      },
    },
    
    'when handling a non-retract request': {
      topic: function(retractParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'hamlet@denmark.lit/blogbot', 'set');
        var pubsubEl = new PubSub();
        var publishEl = new Publish('princely_musings');
        iq.c(pubsubEl).c(publishEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          retractParser(iq, next)
        });
      },
      
      'should not set action property' : function(err, stanza) {
        assert.isUndefined(stanza.action);
      },
      'should not set node property' : function(err, stanza) {
        assert.isUndefined(stanza.node);
      },
      'should not set itemID property' : function(err, stanza) {
        assert.isUndefined(stanza.itemID);
      },
    },
    
    'when handling an IQ-get retract request': {
      topic: function(retractParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'hamlet@denmark.lit/elsinore', 'get');
        var pubsubEl = new PubSub();
        var retractEl = new Retract('princely_musings');
        retractEl.c('item', { id: 'bnd81g37d61f49fgn581' });
        iq.c(pubsubEl).c(retractEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          retractParser(iq, next)
        });
      },
      
      'should indicate an error' : function(err, stanza) {
        assert.instanceOf(err, StanzaError);
        assert.equal(err.type, 'modify');
        assert.equal(err.condition, 'bad-request');
      },
    },
    
    'when handling a retract request without an item element': {
      topic: function(retractParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'hamlet@denmark.lit/elsinore', 'set');
        var pubsubEl = new PubSub();
        var retractEl = new Retract('princely_musings');
        iq.c(pubsubEl).c(retractEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          retractParser(iq, next)
        });
      },
      
      'should indicate an error' : function(err, stanza) {
        assert.instanceOf(err, StanzaError);
        assert.equal(err.type, 'modify');
        assert.equal(err.condition, 'bad-request');
      },
    },
    
    'when handling a retract request with an item element lacking an id attribute': {
      topic: function(retractParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'hamlet@denmark.lit/elsinore', 'set');
        var pubsubEl = new PubSub();
        var retractEl = new Retract('princely_musings');
        retractEl.c('item');
        iq.c(pubsubEl).c(retractEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          retractParser(iq, next)
        });
      },
      
      'should indicate an error' : function(err, stanza) {
        assert.instanceOf(err, StanzaError);
        assert.equal(err.type, 'modify');
        assert.equal(err.condition, 'bad-request');
      },
    },
    
    'when handling a retract request without a node attribute': {
      topic: function(retractParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'hamlet@denmark.lit/elsinore', 'set');
        var pubsubEl = new PubSub();
        var retractEl = new Retract();
        retractEl.c('item', { id: 'bnd81g37d61f49fgn581' });
        iq.c(pubsubEl).c(retractEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          retractParser(iq, next)
        });
      },
      
      'should indicate an error' : function(err, stanza) {
        assert.instanceOf(err, StanzaError);
        assert.equal(err.type, 'modify');
        assert.equal(err.condition, 'bad-request');
      },
    },
    
    'when handling an IQ stanza that is not a publish-subscribe stanza': {
      topic: function(retractParser) {
        var self = this;
        var iq = new IQ('romeo@example.net', 'juliet@example.com', 'get');
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          retractParser(iq, next)
        });
      },
      
      'should not set action property' : function(err, stanza) {
        assert.isUndefined(stanza.action);
      },
      'should not set node property' : function(err, stanza) {
        assert.isUndefined(stanza.node);
      },
    },
  },
  
}).export(module);
