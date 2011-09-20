/**
 * Module dependencies.
 */
var Route = require('./route');


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
 * Route dispatch, aka the route "middleware".
 *
 * @param {XMLElement} req
 * @param {XMLElement} res
 * @param {Function} next
 * @api private
 */
Router.prototype._dispatch = function(req, res, next) {
  var self = this;

  (function pass(i, err) {
    var route = self._match(req, i);
    if (!route) { return next(err); }
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
 * @param {XMLElement} req
 * @param {Number} i
 * @return {Route}
 * @api private
 */
Router.prototype._match = function(req, i) {
  var action = req.action
    , node = req.node
    , routes
    , route
    , captures
    , keys;
  
  // routes for this action
  if (routes = this._routes[action]) {
    
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
 * Route `action`, `node`, and one or more callbacks.
 *
 * @param {String} action
 * @param {String} node
 * @param {Function|Array} callbacks
 * @return {Router}
 * @api private
 */
Router.prototype._route = function(action, node, callbacks) {
  function flatten(array, ret) {
    var ret = ret || []
      , len = array.length;
    for (var i = 0; i < len; ++i) {
      if (Array.isArray(array[i])) {
        flatten(array[i], ret);
      } else {
        ret.push(array[i]);
      }
    }
    return ret;
  };
  
  
  callbacks = flatten(Array.prototype.slice.call(arguments, 2));
  
  var route = new Route(action, node, callbacks);
  (this._routes[action] = this._routes[action] || [])
    .push(route);
  return this;
};


/**
 * Expose `Router`.
 */
module.exports = Router;
