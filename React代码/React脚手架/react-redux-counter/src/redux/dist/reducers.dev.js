"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _actionTypes = require("./action-types");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function counter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes.INCREMENT:
      return state + action.data;

    case _actionTypes.DECREMENT:
      return state - action.data;

    default:
      return state;
  }
}

var comments = [];

function commentReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : comments;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes.Add:
      return [action.data].concat(_toConsumableArray(state));

    case _actionTypes.Del:
      return state.filter(function (comment, index) {
        // console.log(comment, index, action.data);
        return index !== action.data;
      });

    case _actionTypes.Get:
      return action.data;

    default:
      return state;
  }
}

var _default = (0, _redux.combineReducers)({
  counter: counter,
  commentReducer: commentReducer
});

exports["default"] = _default;