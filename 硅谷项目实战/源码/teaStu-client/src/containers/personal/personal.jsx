import React, { Component } from "react";
import { Result, List, WhiteSpace, Button, Modal } from "antd-mobile";
import Cookies from "js-cookie";
import { connect } from "react-redux";

import { resetUser } from "../../redux/actions";

const Item = List.Item;
const Brief = Item.Brief;
class Personal extends Component {
  handleLogout = () => {
    Modal.alert("退出", "确认退出登录吗", [
      {
        text: "取消",
        onPress: () => console.log("cancel"),
      },
      {
        text: "确认",
        onPress: () => {
          Cookies.remove("userid");
          this.props.resetUser();
        },
      },
    ]);
  };
  render() {
    const { username, header, post, info, salary, company } = this.props.user;
    return (
      <div style={{ marginTop: 50 }}>
        <Result
          img={
            <img
              src={require(`../../assets/imgs/${header}.png`)}
              alt="header"
              style={{ widthh: 50 }}
            ></img>
          }
          title={username}
          message={company}
        ></Result>
        <List renderHeader={() => "相关信息"}>
          <Item multipleLine>
            <Brief>职位: {post}</Brief>
            <Brief>简介: {info}</Brief>
            {salary ? <Brief>薪资: {salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Button type="warning" onClick={this.handleLogout}>
            退出登录
          </Button>
        </List>
      </div>
    );
  }
}
export default connect((state) => ({ user: state.user }), { resetUser })(
  Personal
);
