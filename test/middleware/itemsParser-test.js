var vows = require('vows');
var assert = require('assert');
var util = require('util');
var IQ = require('junction').elements.IQ;
var StanzaError = require('junction').StanzaError;
var PubSub = require('junction-pubsub/elements/pubsub');
var Items = require('junction-pubsub/elements/items');
var Publish = require('junction-pubsub/elements/publish');
var itemsParser = require('junction-pubsub/middleware/itemsParser');


vows.describe('itemsParser').addBatch({

  'middleware': {
    topic: function() {
      return itemsParser();
    },
    
    'when handling an items request': {
      topic: function(itemsParser) {
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
          itemsParser(iq, next)
        });
      },
      
      'should set action property' : function(err, stanza) {
        assert.equal(stanza.action, 'items');
      },
      'should set node property' : function(err, stanza) {
        assert.equal(stanza.node, 'princely_musings');
      },
      'should not set maxItems property' : function(err, stanza) {
        assert.isUndefined(stanza.maxItems);
      },
    },
    
    'when handling an items request with max_items': {
      topic: function(itemsParser) {
        var self = this;
        var iq = new IQ('pubsub.shakespeare.lit', 'francisco@denmark.lit/barracks', 'get');
        var pubsubEl = new PubSub();
        var itemsEl = new Items('princely_musings');
        itemsEl.maxItems = 2;
        iq.c(pubsubEl).c(itemsEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          itemsParser(iq, next)
        });
      },
      
      'should set action property' : function(err, stanza) {
        assert.equal(stanza.action, 'items');
      },
      'should set node property' : function(err, stanza) {
        assert.equal(stanza.node, 'princely_musings');
      },
      'should set maxItems property' : function(err, stanza) {
        assert.isNumber(stanza.maxItems);
        assert.equal(stanza.maxItems, 2);
      },
    },
    
    'when handling a non-items request': {
      topic: function(itemsParser) {
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
          itemsParser(iq, next)
        });
      },
      
      'should not set action property' : function(err, stanza) {
        assert.isUndefined(stanza.action);
      },
      'should not set node property' : function(err, stanza) {
        assert.isUndefined(stanza.node);
      },
    },
    
    'when handling an IQ-set items request': {
      topic: function(itemsParser) {
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
          itemsParser(iq, next)
        });
      },
      
      'should indicate an error' : function(err, stanza) {
        assert.instanceOf(err, StanzaError);
        assert.equal(err.type, 'modify');
        assert.equal(err.condition, 'bad-request');
      },
    },
    
    'when handling an items result': {
      topic: function(itemsParser) {
        var self = this;
        var iq = new IQ('francisco@denmark.lit/barracks', 'pubsub.shakespeare.lit', 'result');
        var pubsubEl = new PubSub();
        var itemsEl = new Items('princely_musings');
        iq.c(pubsubEl).c(itemsEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          itemsParser(iq, next)
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
      topic: function(itemsParser) {
        var self = this;
        var iq = new IQ('romeo@example.net', 'juliet@example.com', 'get');
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          itemsParser(iq, next)
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
