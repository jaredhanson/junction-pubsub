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
    'should have an subscribe function': function (c) {
      assert.isFunction(c.subscribe);
    },
    'should have an unsubscribe function': function (c) {
      assert.isFunction(c.unsubscribe);
    },
  },
  
}).export(module);
