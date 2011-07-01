var Client = require('./client');

exports.createConnection = function (options) {
  // @todo: Implement support for component connections.
  return new Client(options);
};


exports.elements = {};
exports.elements.PubSub = require('./elements/pubsub');
exports.elements.Publish = require('./elements/publish');
exports.elements.Subscribe = require('./elements/subscribe');
exports.elements.Unsubscribe = require('./elements/unsubscribe');


// @todo: Implement middleware for Result Set Management
//        http://jabber.org/protocol/rsm
// @todo: Implement SHIM middleware, with message and IQ support