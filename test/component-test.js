var vows = require('vows');
var assert = require('assert');
var junction = require('junction');
var util = require('util');
//var Component = require('junction-pubsub/component');


/*
vows.describe('Component').addBatch({
  
  'initialization': {
    topic: function() {
      return new Component({ jid: 'component.invalid.host', host: 'invalid.host', port: 5060, disableStream: true });
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
  
}).export(module);
*/
