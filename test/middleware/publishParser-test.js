var vows = require('vows');
var assert = require('assert');
var util = require('util');
var IQ = require('junction').elements.IQ;
var StanzaError = require('junction').StanzaError;
var PubSub = require('junction-pubsub/elements/pubsub');
var Publish = require('junction-pubsub/elements/publish');
var Retract = require('junction-pubsub/elements/retract');
var publishParser = require('junction-pubsub/middleware/publishParser');


vows.describe('publishParser').addBatch({

  'middleware': {
    topic: function() {
      return publishParser();
    },
    
    'when handling a publish request': {
      topic: function(publishParser) {
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
          publishParser(iq, next)
        });
      },
      
      'should set action property' : function(err, stanza) {
        assert.equal(stanza.action, 'publish');
      },
      'should set node property' : function(err, stanza) {
        assert.equal(stanza.node, 'princely_musings');
      },
      'should not set itemID property' : function(err, stanza) {
        assert.isUndefined(stanza.itemID);
      },
    },
    
    'when handling a publish request with an item without an ID': {
      topic: function(publishParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'hamlet@denmark.lit/blogbot', 'set');
        var pubsubEl = new PubSub();
        var publishEl = new Publish('princely_musings');
        publishEl.c('item');
        iq.c(pubsubEl).c(publishEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          publishParser(iq, next)
        });
      },
      
      'should set action property' : function(err, stanza) {
        assert.equal(stanza.action, 'publish');
      },
      'should set node property' : function(err, stanza) {
        assert.equal(stanza.node, 'princely_musings');
      },
      'should not set itemID property' : function(err, stanza) {
        assert.isUndefined(stanza.itemID);
      },
    },
    
    'when handling a publish request with an item with an ID': {
      topic: function(publishParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'hamlet@denmark.lit/blogbot', 'set');
        var pubsubEl = new PubSub();
        var publishEl = new Publish('princely_musings');
        publishEl.c('item', { id: 'bnd81g37d61f49fgn581' });
        iq.c(pubsubEl).c(publishEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          publishParser(iq, next)
        });
      },
      
      'should set action property' : function(err, stanza) {
        assert.equal(stanza.action, 'publish');
      },
      'should set node property' : function(err, stanza) {
        assert.equal(stanza.node, 'princely_musings');
      },
      'should set itemID property' : function(err, stanza) {
        assert.equal(stanza.itemID, 'bnd81g37d61f49fgn581');
      },
    },
    
    'when handling a non-publish request': {
      topic: function(publishParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'hamlet@denmark.lit/blogbot', 'set');
        var pubsubEl = new PubSub();
        var retractEl = new Retract('princely_musings');
        iq.c(pubsubEl).c(retractEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          publishParser(iq, next)
        });
      },
      
      'should not set action property' : function(err, stanza) {
        assert.isUndefined(stanza.action);
      },
      'should not set node property' : function(err, stanza) {
        assert.isUndefined(stanza.node);
      },
    },
    
    'when handling an IQ-get publish request': {
      topic: function(publishParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'hamlet@denmark.lit/blogbot', 'get');
        var pubsubEl = new PubSub();
        var publishEl = new Publish('princely_musings');
        iq.c(pubsubEl).c(publishEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          publishParser(iq, next)
        });
      },
      
      'should indicate an error' : function(err, stanza) {
        assert.instanceOf(err, StanzaError);
        assert.equal(err.type, 'modify');
        assert.equal(err.condition, 'bad-request');
      },
    },
    
    'when handling a publish request without a node attribute': {
      topic: function(publishParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'hamlet@denmark.lit/blogbot', 'set');
        var pubsubEl = new PubSub();
        var publishEl = new Publish();
        iq.c(pubsubEl).c(publishEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          publishParser(iq, next)
        });
      },
      
      'should indicate an error' : function(err, stanza) {
        assert.instanceOf(err, StanzaError);
        assert.equal(err.type, 'modify');
        assert.equal(err.condition, 'bad-request');
      },
    },
    
    'when handling a publish result': {
      topic: function(publishParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'hamlet@denmark.lit/blogbot', 'result');
        var pubsubEl = new PubSub();
        var publishEl = new Publish('princely_musings');
        iq.c(pubsubEl).c(publishEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          publishParser(iq, next)
        });
      },
      
      'should not set action property' : function(err, stanza) {
        assert.isUndefined(stanza.action);
      },
      'should not set node property' : function(err, stanza) {
        assert.isUndefined(stanza.node);
      },
    },
    
    'when handling an IQ stanza that is not a publish-subscribe stanza': {
      topic: function(publishParser) {
        var self = this;
        var iq = new IQ('romeo@example.net', 'juliet@example.com', 'get');
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          publishParser(iq, next)
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
