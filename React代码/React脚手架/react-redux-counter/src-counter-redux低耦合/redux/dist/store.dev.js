"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reducers = require("./reducers");

var store = (0, _redux.createStore)(_reducers.counter); //内部会第一次调用reducer函数得到初始state

var _default = store;
exports["default"] = _default;