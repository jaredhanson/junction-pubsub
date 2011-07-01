var junction = require('junction');
var util = require('util');
var Router = require('./router');

function Client(options) {
  junction.Client.call(this, options);
  this.init();
}

util.inherits(Client, junction.Client);

Client.prototype.init = function() {
  var self = this;
  
  this.use(function(req, res, next) {
    req.connection = self;
    next();
  });
  
  this._router = new Router();
  this.__defineGetter__('router', function() {
    this._usedRouter = true;
    return self._router.middleware;
  });
}


var actions = require('./actions');

actions.forEach(function(action) {
  var method = action;
  Client.prototype[method] = function(fn) {
    var args = [action].concat(Array.prototype.slice.call(arguments));
    // Delay use of the router, causing it to be low on the stack, thus not
    // consuming stanzas before they have a chance to be logged, etc.
    if (!this._usedRouter) {
      this.use(require('./middleware/publish')());
      this.use(require('./middleware/subscribe')());
      this.use(require('./middleware/unsubscribe')());
      this.use(this.router);
    }
    return this._router._route.apply(this._router, args);
  }
});


module.exports = Client;
