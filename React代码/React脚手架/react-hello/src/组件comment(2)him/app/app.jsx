import React, { Component } from "react";

import CompontentAdd from "../compontent-add/compontent-add";
import CompontentList from "../compontent-list/compontent-list";

export default class App extends Component {
  state = {
    comments: [
      { username: "Tom", content: "汤姆很帅啊" },
      { username: "Jack", content: "杰克很帅啊" },
    ],
  };
  addComment = (comment) => {
    const { comments } = this.state;
    comments.unshift(comment);
    this.setState({ comments });
  };
  delComment = (index) => {
    const { comments } = this.state;
    comments.splice(index, 1);
    this.setState({ comments });
  };
  render() {
    return (
      <div>
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
            <CompontentAdd addComment={this.addComment} />
            <CompontentList
              comments={this.state.comments}
              delComment={this.delComment}
            />
          </div>
        </div>
      </div>
    );
  }
}
