"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decrement = exports.increment = void 0;

var _actionTypes = require("./action-types");

var increment = function increment(number) {
  return {
    type: _actionTypes.INCREMENT,
    data: number
  };
};

exports.increment = increment;

var decrement = function decrement(number) {
  return {
    type: _actionTypes.DECREMENT,
    data: number
  };
};

exports.decrement = decrement;