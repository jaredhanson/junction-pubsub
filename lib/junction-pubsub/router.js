/**
 * Module dependencies.
 */
var Route = require('./route')
  , utils = require('./utils')
  , debug = require('debug')('junction-pubsub:router')


/**
 * Initialize a new `Router`.
 *
 * @api private
 */
function Router() {
  var self = this;
  this._routes = {};

  this.middleware = function(req, res, next) {
    self._dispatch(req, res, next);
  };
}

/**
 * Route `action`, `node`, and one or more callbacks.
 *
 * @param {String} action
 * @param {String} node
 * @param {Function|Array} callbacks
 * @return {Router}
 * @api private
 */
Router.prototype.route
Router.prototype._route = function(action, node, callbacks) {
  callbacks = utils.flatten(Array.prototype.slice.call(arguments, 2));
  
  debug('defined %s %s', action, node);
  var route = new Route(action, node, callbacks);
  (this._routes[action] = this._routes[action] || []).push(route);
  return this;
};

/**
 * Route dispatch, aka the route "middleware".
 *
 * @param {Stanza} req
 * @param {Stanza} res
 * @param {Function} next
 * @api private
 */
Router.prototype._dispatch = function(req, res, next) {
  var self = this;

  debug('dispatching %s %s', req.action, req.node);

  (function pass(i, err) {
    var route = self._match(req, i);
    if (!route) { return next(err); }
    
    debug('matched %s %s', route.action, route.node);
    req.params = route.params;

    function nextRoute(err) {
      pass(i + 1, err);
    }

    var idx = 0;
    function callbacks(err) {
      var fn = route.callbacks[idx++];
      try {
        if ('route' == err) {
          nextRoute();
        } else if (err && fn) {
          if (fn.length < 4) { return callbacks(err); }
          fn(err, req, res, callbacks);
        } else if (fn) {
          fn(req, res, callbacks);
        } else {
          nextRoute(err);
        }
      } catch (err) {
        callbacks(err);
      }
    }

    callbacks();
  })(0);
}

/**
 * Attempt to match a route for `req` starting from offset `i`.
 *
 * @param {Stanza} req
 * @param {Number} i
 * @return {Route}
 * @api private
 */
Router.prototype._match = function(req, i) {
  var action = req.action
    , node = req.node
    , routes = this._routes
    , route
    , captures
    , keys
    , i = i || 0;
  
  // routes for this action
  if (routes = routes[action]) {
    
    // matching routes
    for (var len = routes.length; i < len; ++i) {
      route = routes[i];
      if (captures = route.match(node)) {
        keys = route.keys;
        route.params = [];
        
        // params from capture groups
        for (var j = 1, jlen = captures.length; j < jlen; ++j) {
          var key = keys[j-1]
            , val = captures[j];
          if (key) {
            route.params[key.name] = val;
          } else {
            route.params.push(val);
          }
        }
        return route;
      }
    }
  }
  return null;
}


/**
 * Expose `Router`.
 */
module.exports = Router;
