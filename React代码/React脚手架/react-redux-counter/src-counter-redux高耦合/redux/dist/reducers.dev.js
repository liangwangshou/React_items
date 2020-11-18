"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.counter = counter;

var _actionTypes = require("./action-types");

function counter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  console.log('counter()', state, action);

  switch (action.type) {
    case _actionTypes.INCREMENT:
      return state + action.data;

    case _actionTypes.DECREMENT:
      return state - action.data;

    default:
      return state;
  }
}