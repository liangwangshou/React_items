/*用户注册的路由组件
 */
import React, { Component } from "react";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button,
} from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import ListItem from "antd-mobile/lib/list/ListItem";
import Logo from "../../components/logo/logo";
import { register } from "../../redux/actions";

class Register extends Component {
  state = {
    username: "",
    password: "",
    password2: "",
    type: "dashen",
  };
  register = () => {
    this.props.register(this.state);
  };
  toLogin = () => {
    this.props.history.replace("/login");
  };
  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  };
  render() {
    const { redirectTo, msg } = this.props.user;
    console.log("register1");
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }
    return (
      <div>
        <NavBar>硅谷直聘</NavBar>
        <Logo></Logo>
        <WingBlank>
          {msg ? <p className="error-msg">{msg}</p> : null}
          <List>
            <InputItem
              placeholder="请输入用户名"
              onChange={(val) => {
                this.handleChange("username", val);
              }}
            >
              用户名:
            </InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem
              placeholder="请输入密码"
              type="password"
              onChange={(val) => {
                this.handleChange("password", val);
              }}
            >
              密&nbsp;&nbsp;&nbsp;码:
            </InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem
              placeholder="请输入密码"
              type="password"
              onChange={(val) => {
                this.handleChange("password2", val);
              }}
            >
              确认密码:
            </InputItem>
            <WhiteSpace></WhiteSpace>
            <ListItem>
              <span>用户类型</span>&nbsp;&nbsp;&nbsp;
              <Radio
                checked={this.state.type === "dashen"}
                onClick={() => {
                  this.handleChange("type", "dashen");
                }}
              >
                大神
              </Radio>
              &nbsp;&nbsp;&nbsp;
              <Radio
                checked={this.state.type === "laoban"}
                onClick={() => {
                  this.handleChange("type", "laoban");
                }}
              >
                老板
              </Radio>
              &nbsp;&nbsp;&nbsp;
            </ListItem>
            <WhiteSpace></WhiteSpace>
            <Button type="primary" onClick={this.register}>
              注册
            </Button>
            <WhiteSpace></WhiteSpace>
            <Button onClick={this.toLogin}>已有帐户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}
export default connect((state) => ({ user: state.user }), { register })(
  Register
);
