import React, { Component } from "react";
import PropTypes from "prop-types";

import "./list.css";
import Item from "../item/item";

export default class List extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
  };
  render() {
    const { comments, handleDel } = this.props;
    const display = comments.length === 0 ? "block" : "none";
    return (
      <div className="col-md-8">
        <h3 className="reply">评论回复：</h3>
        <h2 style={{ display: display }}>暂无评论，点击左侧添加评论！！！</h2>
        <ul className="list-group">
          {this.props.comments.map((comment, index) => (
            <Item key={index} index={index} comment={comment} />
          ))}
        </ul>
      </div>
    );
  }
}
