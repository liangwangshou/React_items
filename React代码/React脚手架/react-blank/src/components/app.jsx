import React, { Component } from "react";

import Add from "./add";
import List from "./list";
import PropTypes from "prop-types";

export default class App extends Component {
  // state = {
  //   comments: [
  //     { username: "张三", content: "张三学习React" },
  //     { username: "李四", content: "李四学习React" },
  //   ],
  // };
  static propTypes = {
    comments: PropTypes.array.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleDel: PropTypes.func.isRequired,
  };
  // handleAdd = (comment) => {
  //   const { comments } = this.state;
  //   comments.unshift(comment);
  //   this.setState({ comments });
  // };
  // handleDel = (index) => {
  //   const { comments } = this.state;
  //   comments.splice(index, 1);
  //   this.setState({ comments });
  // };
  // componentDidMount() {
  //   Pubsub.subscribe("delcomment", (msg, index) => {
  //     this.handleDel(index);
  //   });
  // }
  render() {
    const { comments, handleAdd, handleDel } = this.props;
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
            <Add handleAdd={handleAdd} />
            <List comments={comments} handleDel={handleDel} />
          </div>
        </div>
      </div>
    );
  }
}
