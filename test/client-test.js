var vows = require('vows');
var assert = require('assert');
var junction = require('junction');
var util = require('util');
var Client = require('junction-pubsub/client');


vows.describe('Client').addBatch({
  
  'initialization': {
    topic: function() {
      return new Client({ jid: 'user@invalid.host', disableStream: true });
    },
    
    'should have an publish function': function (c) {
      assert.isFunction(c.publish);
    },
    'should have an retract function': function (c) {
      assert.isFunction(c.retract);
    },
    'should have an subscribe function': function (c) {
      assert.isFunction(c.subscribe);
    },
    'should have an unsubscribe function': function (c) {
      assert.isFunction(c.unsubscribe);
    },
  },
  
  'routing a subscribe request to a node': {
    topic: function() {
      var self = this;
      var client = new Client({ jid: 'pubsub.shakespeare.lit', disableStream: true });
      client.subscribe('princely_musings', function(req, res, next) {
        self.callback(null, req);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('pubsub.shakespeare.lit', 'francisco@denmark.lit/barracks', 'set');
        iq.id = '1';
        iq.c('pubsub', { xmlns: 'http://jabber.org/protocol/pubsub' })
          .c('subscribe', { node: 'princely_musings', jid: 'francisco@denmark.lit' });
        client.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, stanza) {
      assert.isNotNull(stanza);
    },
    'should have correct properties on stanza': function (err, stanza) {
      assert.equal(stanza.node, 'princely_musings');
      assert.isUndefined(stanza.itemID);
    },
  },
  
  'routing an unsubscribe request to a node': {
    topic: function() {
      var self = this;
      var client = new Client({ jid: 'pubsub.shakespeare.lit', disableStream: true });
      client.unsubscribe('princely_musings', function(req, res, next) {
        self.callback(null, req);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('pubsub.shakespeare.lit', 'francisco@denmark.lit/barracks', 'set');
        iq.id = '1';
        iq.c('pubsub', { xmlns: 'http://jabber.org/protocol/pubsub' })
          .c('unsubscribe', { node: 'princely_musings', jid: 'francisco@denmark.lit' });
        client.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, stanza) {
      assert.isNotNull(stanza);
    },
    'should have correct properties on stanza': function (err, stanza) {
      assert.equal(stanza.node, 'princely_musings');
      assert.isUndefined(stanza.itemID);
    },
  },
  
  'routing a publish request to a node': {
    topic: function() {
      var self = this;
      var client = new Client({ jid: 'pubsub.shakespeare.lit', disableStream: true });
      client.publish('princely_musings', function(req, res, next) {
        self.callback(null, req);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('pubsub.shakespeare.lit', 'hamlet@denmark.lit/blogbot', 'set');
        iq.id = '1';
        iq.c('pubsub', { xmlns: 'http://jabber.org/protocol/pubsub' })
          .c('publish', { node: 'princely_musings' });
        client.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, stanza) {
      assert.isNotNull(stanza);
    },
    'should have correct properties on stanza': function (err, stanza) {
      assert.equal(stanza.node, 'princely_musings');
      assert.isUndefined(stanza.itemID);
    },
  },
  
  'routing a publish request with an item ID to a node': {
    topic: function() {
      var self = this;
      var client = new Client({ jid: 'pubsub.shakespeare.lit', disableStream: true });
      client.publish('princely_musings', function(req, res, next) {
        self.callback(null, req);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('pubsub.shakespeare.lit', 'hamlet@denmark.lit/blogbot', 'set');
        iq.id = '1';
        iq.c('pubsub', { xmlns: 'http://jabber.org/protocol/pubsub' })
          .c('publish', { node: 'princely_musings' })
          .c('item', { id: 'bnd81g37d61f49fgn581' });
        client.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, stanza) {
      assert.isNotNull(stanza);
    },
    'should have correct properties on stanza': function (err, stanza) {
      assert.equal(stanza.node, 'princely_musings');
      assert.equal(stanza.itemID, 'bnd81g37d61f49fgn581');
    },
  },
  
  'routing a retract request with an (required) item ID to a node': {
    topic: function() {
      var self = this;
      var client = new Client({ jid: 'pubsub.shakespeare.lit', disableStream: true });
      client.retract('princely_musings', function(req, res, next) {
        self.callback(null, req);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('pubsub.shakespeare.lit', 'hamlet@denmark.lit/elsinore', 'set');
        iq.id = '1';
        iq.c('pubsub', { xmlns: 'http://jabber.org/protocol/pubsub' })
          .c('retract', { node: 'princely_musings' })
          .c('item', { id: 'ae890ac52d0df67ed7cfdf51b644e901' });
        client.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, stanza) {
      assert.isNotNull(stanza);
    },
    'should have correct properties on stanza': function (err, stanza) {
      assert.equal(stanza.node, 'princely_musings');
      assert.equal(stanza.itemID, 'ae890ac52d0df67ed7cfdf51b644e901');
    },
  },
  
}).export(module);
