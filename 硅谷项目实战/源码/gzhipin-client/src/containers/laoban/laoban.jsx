import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserList } from "../../redux/actions";
import UserList from "../../components/user-list/user-list";
class Laoban extends Component {
  componentDidMount() {
    this.props.getUserList("dashen");
  }
  render() {
    return <UserList userListState={this.props.userListState}></UserList>;
  }
}
export default connect((state) => ({ userListState: state.userListState }), {
  getUserList,
})(Laoban);
