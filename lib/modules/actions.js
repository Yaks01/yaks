// Generated by CoffeeScript 1.9.1
(function() {
  var ACTIVE_ELEMENT, Actions, TYPE, a, isFunction, plugin, pubsub;

  pubsub = require('../utils/pubsub.js');

  isFunction = require('../utils/isType.js').Function;

  plugin = require('./plugin.js');

  ACTIVE_ELEMENT = 'data-yaks-action-active';

  TYPE = 'data-yaks-action-type';

  (function() {
    var namespace, ref;
    namespace = ((ref = window.yaks) != null ? ref.nsp : void 0) != null ? window.yaks.nsp : "yaks";
    ACTIVE_ELEMENT = "data-" + namespace + "-action-active";
    return TYPE = "data-" + namespace + "-action-type";
  })();

  Actions = (function() {
    var _actions;

    _actions = {};

    function Actions() {
      pubsub.subscribe('load', this.findActions.bind(this));
      pubsub.subscribe('new_content', this.findActions.bind(this));
    }

    Actions.prototype.registerAction = function(name, action) {
      if (isFunction(action)) {
        return _actions[name] = action;
      }
    };

    Actions.prototype.findActions = function() {
      var action, i, len, ref, results;
      ref = document.querySelectorAll("[" + ACTIVE_ELEMENT + "]");
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        action = ref[i];
        results.push(this._fireAction(action));
      }
      return results;
    };

    Actions.prototype._fireAction = function(el) {
      var i, len, ref, type, types;
      types = el.getAttribute(TYPE);
      if (types == null) {
        return false;
      }
      ref = types.split('|');
      for (i = 0, len = ref.length; i < len; i++) {
        type = ref[i];
        if (_actions[type] != null) {
          _actions[type](el);
        }
      }
      return el.removeAttribute(ACTIVE_ELEMENT);
    };

    Actions.prototype._getActions = function() {
      return Object.create(_actions);
    };

    Actions.prototype._getActiveElement = function() {
      return ACTIVE_ELEMENT;
    };

    return Actions;

  })();

  module.exports = a = new Actions();

}).call(this);