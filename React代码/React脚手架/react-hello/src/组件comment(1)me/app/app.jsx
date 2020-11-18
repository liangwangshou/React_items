import React, { Component } from "react";
import PubSub from "pubsub-js";

import Add from "../add/add";
import List from "../list/list";

export default class App extends Component {
  state = {
    comments: [
      { username: "张三", content: "张三学习React" },
      { username: "李四", content: "李四学习React" },
    ],
  };
  handleAdd = (comment) => {
    const { comments } = this.state;
    comments.unshift(comment);
    this.setState({ comments });
  };
  componentDidMount() {
    PubSub.subscribe("delcomment", (msg, index) => {
      this.handleDel(index);
    });
  }
  handleDel = (index) => {
    const { comments } = this.state;
    comments.splice(index, 1);
    this.setState({ comments });
  };
  render() {
    return (
      <div>
        <header className="site-header jumbotron">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h1>请发表对React的评论</h1>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <Add handleAdd={this.handleAdd} />
          <List comments={this.state.comments} />
        </div>
      </div>
    );
  }
}
