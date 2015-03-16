pubsub = require('../utils/pubsub.js.coffee')
isFunction = require('../utils/isType.js.coffee').Function
plugin = require('./plugin.js.coffee')

# Actions module for DOM function binding
#
class Actions

  ACTIVE_ELEMENT: 'data-yaks-action-active'
  TYPE: 'data-yaks-action-type'

  _actions = {}

  # Constructor 
  #
  constructor: () ->
    pubsub.subscribe 'load', @findActions.bind(@)
    pubsub.subscribe 'new_content', @findActions.bind(@)

  # Register Action
  #
  # @param [String] name Action name (or type)
  # @param [Function] action Action function
  #
  registerAction: (name, action) -> 
    _actions[name] = action if isFunction(action)

  # Find action in DOM
  #
  findActions: ->
    @_fireAction(action) for action in document.querySelectorAll("[#{@ACTIVE_ELEMENT}]")

  # Subscribe actions to PubSub
  #
  # @param [Element] el Action element
  #
  _fireAction: (el) ->
    type = el.getAttribute(@TYPE)
    return false unless _actions[type]?
    _actions[type](el)
    el.removeAttribute @ACTIVE_ELEMENT

  # Expose a clone of the actions for testing
  #
  _getActions: ()-> Object.create(_actions)

module.exports = a = new Actions()