import React, { Component } from "react";
import PropTypes from "prop-types";

import "./compontent-item.css";
export default class CompontentAdd extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    delComment: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  };
  handleDelete = () => {
    const { comment, delComment, index } = this.props;
    if (window.confirm(`确定删除${comment.username}的评论吗`)) {
      delComment(index);
    }
  };
  render() {
    return (
      <li className="list-group-item">
        <div className="handle">
          <button onClick={this.handleDelete}>删除</button>
        </div>
        <p className="user">
          <span>{this.props.comment.username}</span>
          <span>说:</span>
        </p>
        <p className="centence">{this.props.comment.content}</p>
      </li>
    );
  }
}
