import React, { Component } from "react";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button,
} from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Logo from "../../components/logo/logo";
import { login } from "../../redux/actions";
// import Input from "antd-mobile/lib/input-item/Input";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  handleChange = (val, name) => {
    this.setState({
      [name]: val,
    });
    // console.log(this.state);
  };
  login = () => {
    this.props.login(this.state);
  };
  toRegister = () => {
    this.props.history.replace("/register");
  };
  render() {
    const { redirectTo, msg } = this.props;
    //console.log(redirectTo, msg);
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
            <Button type="primary" onClick={this.login}>
              登&nbsp;&nbsp;&nbsp;录
            </Button>
            <WhiteSpace></WhiteSpace>
            <Button onClick={this.toRegister}>注&nbsp;&nbsp;&nbsp;册</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}
export default connect((state) => state.user, { login })(Login);
