var vows = require('vows');
var assert = require('assert');
var pubsub = require('junction-pubsub');


vows.describe('junction-pubsub').addBatch({
  
  'should export version': function() {
    assert.isString(pubsub.version);
  },
  
  'should export create function': function() {
    assert.isFunction(pubsub);
    assert.isFunction(pubsub.create);
    assert.equal(pubsub, pubsub.create);
  },
  
  'should export elements': function() {
    assert.isFunction(pubsub.elements.PubSub);
    assert.isFunction(pubsub.elements.Subscribe);
    assert.isFunction(pubsub.elements.Unsubscribe);
    assert.isFunction(pubsub.elements.Items);
    assert.isFunction(pubsub.elements.Publish);
    assert.isFunction(pubsub.elements.Retract);
    assert.isFunction(pubsub.elements.Item);
  },
  
}).export(module);
