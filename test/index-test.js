var vows = require('vows');
var assert = require('assert');
var junction = require('junction');
var pubsub = require('junction-pubsub');
var util = require('util');


vows.describe('Module').addBatch({
  
  'create connection with client type': {
    topic: function() {
      return new pubsub.createConnection({ type: 'client', jid: 'user@invalid.host', disableStream: true });
    },
    
    'should be an instance of Client': function (c) {
      assert.instanceOf(c, pubsub.Client);
    },
  },
  
  'create connection with component type': {
    topic: function() {
      return new pubsub.createConnection({ type: 'component', jid: 'component.invalid.host', host: 'invalid.host', port: 5060, disableStream: true });
    },
    
    'should be an instance of Component': function (c) {
      assert.instanceOf(c, pubsub.Component);
    },
  },
  
}).export(module);
