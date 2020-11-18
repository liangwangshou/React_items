import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import MyNavLink from "../component/MyNavLink";
import Message from "./home-message";
import News from "./home-news";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home 组件内容</h2>
        <ul className="nav nav-tabs">
          <li>
            <MyNavLink to="/home/news">New</MyNavLink>
          </li>
          <li>
            <MyNavLink to="/home/message">Message</MyNavLink>
          </li>
        </ul>
        <div>
          <Switch>
            <Route path="/home/news" component={News}></Route>
            <Route path="/home/message" component={Message}></Route>
            <Redirect to="/home/news"></Redirect>
          </Switch>
        </div>
      </div>
    );
  }
}
