/**
 * Module dependencies.
 */
var Router = require('./router')
  , debug = require('debug')('junction-pubsub');


/**
 * Application prototype.
 */
var app = exports = module.exports = {};

/**
 * Initialize application.
 *
 * @api private
 */
app.init = function() {
  this._router = new Router();
  this.__defineGetter__('router', function() {
    this._usedRouter = true;
    return this._router.middleware;
  });
  
  // implicit middleware
  this.use(require('./middleware/subscribeParser')());
  this.use(require('./middleware/unsubscribeParser')());
  this.use(require('./middleware/itemsParser')());
  this.use(require('./middleware/publishParser')());
  this.use(require('./middleware/retractParser')());
};


/**
 * Delegate `.ACTION(...)` calls to `.route(ACTION, ...)`.
 */
var actions = require('./actions');

actions.forEach(function(action) {
  var method = action;
  app[method] = function(node) {
    var args = [action].concat(Array.prototype.slice.call(arguments));
    if (!this._usedRouter) { this.use(this.router); }
    return this._router.route.apply(this._router, args);
  }
});
