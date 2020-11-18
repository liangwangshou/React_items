import React, { Component } from "react";
import PropTypes from "prop-types";

import "./css/item.css";
export default class Item extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    handleDel: PropTypes.func.isRequired,
  };
  handelDelDir = () => {
    const { comment, index, handleDel } = this.props;
    if (window.confirm(`确认删除${comment.username}评论吗`)) {
      handleDel(index);
    }
  };
  render() {
    const { username, content } = this.props.comment;
    return (
      <li className="list-group-item">
        <div className="handle">
          <button onClick={this.handelDelDir}>删除</button>
        </div>
        <p className="user">
          <span>{username}</span>
          <span>说:</span>
        </p>
        <p className="centence">{content}</p>
      </li>
    );
  }
}
