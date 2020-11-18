import React, { Component } from "react";
import PropTypes from "prop-types";
import PubSub from "pubsub-js";

import "./item.css";

export default class Item extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,

    index: PropTypes.number.isRequired,
  };
  buttonDel = () => {
    const { comment, index } = this.props;
    if (window.confirm(`确认删除${comment.username}的评论吗`)) {
      PubSub.publish("delcomment", index);
    }
  };
  render() {
    return (
      <li className="list-group-item">
        <div className="handle">
          <button onClick={this.buttonDel}>删除</button>
        </div>
        <p className="user">
          <span>{this.props.comment.username}</span>
          <span>说:</span>
        </p>
        <p className="centence">{this.props.comment.content}!</p>
      </li>
    );
  }
}
