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

import Logo from "../../components/logo/logo";
import { register } from "../../redux/actions";

class Register extends Component {
  state = {
    username: "",
    password: "",
    password2: "",
    type: "teacher",
  };
  handleChange = (val, name) => {
    this.setState({
      [name]: val,
    });
    // console.log(this.state);
  };
  register = () => {
    this.props.register(this.state);
  };
  toLogin = () => {
    this.props.history.replace("/login");
  };
  render() {
    const { redirectTo, msg } = this.props;
    // console.log(redirectTo, msg);
    if (redirectTo) {
      return <Redirect to={redirectTo}></Redirect>;
    }
    return (
      <div>
        <NavBar>师生在线平台</NavBar>
        <Logo></Logo>
        <WingBlank>
          {msg ? <p className="error-msg">{msg}</p> : null}
          <List>
            <InputItem
              placeholder="请输入用户名"
              onChange={(val) => this.handleChange(val, "username")}
            >
              用户名:
            </InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem
              placeholder="请输入密码"
              type="password"
              onChange={(val) => this.handleChange(val, "password")}
            >
              密&nbsp;&nbsp;&nbsp;码:
            </InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem
              placeholder="请输入密码"
              type="password"
              onChange={(val) => this.handleChange(val, "password2")}
            >
              确认密码:
            </InputItem>
            <WhiteSpace></WhiteSpace>
            <List.Item>
              <span>用户类型:</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio
                checked={this.state.type === "teacher"}
                onClick={(val) => this.handleChange("teacher", "type")}
              >
                老师
              </Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio
                checked={this.state.type === "student"}
                onClick={(val) => this.handleChange("student", "type")}
              >
                学生
              </Radio>
            </List.Item>
            <WhiteSpace></WhiteSpace>
            <Button type="primary" onClick={this.register}>
              注&nbsp;&nbsp;&nbsp;册
            </Button>
            <WhiteSpace></WhiteSpace>
            <Button onClick={this.toLogin}>已经有账号</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}
export default connect((state) => state.user, { register })(Register);
