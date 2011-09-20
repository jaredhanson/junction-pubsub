var vows = require('vows');
var assert = require('assert');
var util = require('util');
var Route = require('junction-pubsub/route');


vows.describe('Route').addBatch({
  
  'initialize with action, node, and callbacks': {
    topic: function() {
      return new Route('publish', 'princely_musings', [ function(){} ]);
    },
    
    'should have an action property': function (route) {
      assert.equal(route.action, 'publish');
    },
    'should have a node property': function (route) {
      assert.equal(route.node, 'princely_musings');
    },
    'should have a callbacks property': function (route) {
      assert.isArray(route.callbacks);
    },
    'should have a regexp property': function (route) {
      assert.instanceOf(route.regexp, RegExp);
    },
  },
  
}).export(module);
