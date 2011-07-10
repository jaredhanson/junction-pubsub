var vows = require('vows');
var assert = require('assert');
var util = require('util');
var IQ = require('junction').elements.IQ;
var StanzaError = require('junction').StanzaError;
var PubSub = require('junction-pubsub/elements/pubsub');
var Items = require('junction-pubsub/elements/items');
var Publish = require('junction-pubsub/elements/publish');
var items = require('junction-pubsub/middleware/items');


vows.describe('items').addBatch({

  'middleware': {
    topic: function() {
      return items();
    },
    
    'when handling an items request': {
      topic: function(items) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'francisco@denmark.lit/barracks', 'get');
        var pubsubEl = new PubSub();
        var itemsEl = new Items('princely_musings');
        iq.c(pubsubEl).c(itemsEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          items(iq, next)
        });
      },
      
      'should set action property' : function(err, stanza) {
        assert.equal(stanza.action, 'items');
      },
      'should set node property' : function(err, stanza) {
        assert.equal(stanza.node, 'princely_musings');
      },
    },
    
    'when handling a non-items request': {
      topic: function(items) {
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
          items(iq, next)
        });
      },
      
      'should not set action property' : function(err, stanza) {
        assert.isUndefined(stanza.action);
      },
      'should not set node property' : function(err, stanza) {
        assert.isUndefined(stanza.node);
      },
    },
    
    'when handling a non-IQ-get items request': {
      topic: function(items) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'francisco@denmark.lit/barracks', 'set');
        var pubsubEl = new PubSub();
        var itemsEl = new Items('princely_musings');
        iq.c(pubsubEl).c(itemsEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          items(iq, next)
        });
      },
      
      'should indicate an error' : function(err, stanza) {
        assert.instanceOf(err, StanzaError);
        assert.equal(err.type, 'modify');
        assert.equal(err.condition, 'bad-request');
      },
    },
    
    'when handling an IQ stanza that is not a publish-subscribe stanza': {
      topic: function(items) {
        var self = this;
        var iq = new IQ('romeo@example.net', 'juliet@example.com', 'get');
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          items(iq, next)
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
