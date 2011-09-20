/**
 * Module dependencies.
 */
var junction = require('junction')
  , util = require('util')
  , Client = require('./client');


/**
 * Initialize a new `Component`.
 *
 * @param {Object} options
 * @api public
 */
function Component(options) {
  junction.Component.call(this, options);
  this.init();
};

/**
 * Inherit from `junction.Component`.
 */
util.inherits(Component, junction.Component);

/**
 * Mixin Client methods.
 */
Object.keys(Client.prototype).forEach(function(method) {
  Component.prototype[method] = Client.prototype[method];
});


/**
 * Expose `Component`.
 */
module.exports = Component;
