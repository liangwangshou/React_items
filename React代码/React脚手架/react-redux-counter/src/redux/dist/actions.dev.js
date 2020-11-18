"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComments = exports.handleDel = exports.handleAdd = void 0;

var _actionTypes = require("./action-types");

var handleAdd = function handleAdd(comment) {
  return {
    type: _actionTypes.Add,
    data: comment
  };
};

exports.handleAdd = handleAdd;

var handleDel = function handleDel(index) {
  return {
    type: _actionTypes.Del,
    data: index
  };
};

exports.handleDel = handleDel;

var receiveComments = function receiveComments(comments) {
  return {
    type: _actionTypes.Get,
    data: comments
  };
};

var getComments = function getComments() {
  return function (dispatch) {
    setTimeout(function () {
      var comments = [{
        username: "张三",
        content: "张三学习React"
      }, {
        username: "李四",
        content: "李四学习React"
      }];
      dispatch(receiveComments(comments));
    }, 1000);
  };
};

exports.getComments = getComments;