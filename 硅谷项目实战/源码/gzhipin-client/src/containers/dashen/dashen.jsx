/*大神的主路由组件
 */
import React from "react";
import { connect } from "react-redux";
import { getUserList } from "../../redux/actions";
import UserList from "../../components/user-list/user-list";
class Dashen extends React.Component {
  componentDidMount() {
    this.props.getUserList("laoban");
  }
  render() {
    return <UserList userListState={this.props.userListState}></UserList>;
  }
}
export default connect((state) => ({ userListState: state.userListState }), {
  getUserList,
})(Dashen);
