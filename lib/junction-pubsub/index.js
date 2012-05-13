/**
 * Module dependencies.
 */
 var junction = require('junction')
   , application = require('./application')
   , utils = require('./utils');


/**
 * Expose `create()`.
 */
exports = module.exports = create;

/**
 * Framework version.
 */
require('pkginfo')(module, 'version');

/**
 * Create a Junction/PubSub application.
 *
 * @return {Function}
 * @api public
 */
function create() {
  var app = junction();
  utils.merge(app, application);
  app.init();
  return app;
}

/**
 * Expose `.create()` as module method.
 */
exports.create = create;

/**
 * Expose element constructors.
 */
exports.elements = {};
exports.elements.PubSub = require('./elements/pubsub');
exports.elements.Publish = require('./elements/publish');
exports.elements.Subscribe = require('./elements/subscribe');
exports.elements.Unsubscribe = require('./elements/unsubscribe');
