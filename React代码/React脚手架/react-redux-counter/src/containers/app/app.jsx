import React, { Component } from "react";

import PropTypes from "prop-types";

import Add from "../../components/add/add";
import List from "../../components/list/list";

import { connect } from "react-redux";
import { handleAdd, handleDel, getComments } from "../../redux/actions";
class App extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleDel: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.getComments();
  }
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
export default connect(
  (state) => ({
    comments: state.commentReducer,
  }),
  { handleAdd, handleDel, getComments }
)(App);
