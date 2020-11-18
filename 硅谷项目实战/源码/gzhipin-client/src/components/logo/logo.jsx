/*用户登陆的路由组件
 */
import React, { Component } from "react";
import logo from "./logo.png";
import "./logo.less";
export default class Login extends Component {
  render() {
    return (
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo-img" />
      </div>
    );
  }
}
