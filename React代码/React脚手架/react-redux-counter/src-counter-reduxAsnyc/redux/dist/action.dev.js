"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.incrementAsync = exports.decrement = exports.increment = void 0;

var _actionTypes = require("./action-types");

//包含所有 action creator
//同步返回对象
//异步返回函数
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
}; //异步action


exports.decrement = decrement;

var incrementAsync = function incrementAsync(number) {
  return function (dispatch) {
    setTimeout(function () {
      //1秒之后才去分发增加一个cation
      console.log(dispatch);
      dispatch(increment(number));
    }, 1000);
  };
};

exports.incrementAsync = incrementAsync;