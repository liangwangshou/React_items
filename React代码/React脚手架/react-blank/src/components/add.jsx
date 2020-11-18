import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Add extends Component {
  static propTypes = {
    handleAdd: PropTypes.func.isRequired,
  };
  state = {
    username: "",
    content: "",
  };
  addContent = (e) => {
    const content = e.target.value;
    this.setState({ content });
  };
  addUsername = (e) => {
    const username = e.target.value;
    this.setState({ username });
  };
  handleAddDir = () => {
    const comment = this.state;
    this.props.handleAdd(comment);
  };
  render() {
    const { username, content } = this.state;
    return (
      <div className="col-md-4">
        <form className="form-horizontal">
          <div className="form-group">
            <label>用户名</label>
            <input
              type="text"
              className="form-control"
              placeholder="用户名"
              value={username}
              onChange={this.addUsername}
            />
          </div>
          <div className="form-group">
            <label>评论内容</label>
            <textarea
              className="form-control"
              rows="6"
              placeholder="评论内容"
              value={content}
              onChange={this.addContent}
            ></textarea>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button
                type="button"
                className="btn btn-default pull-right"
                onClick={this.handleAddDir}
              >
                提交
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
