import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import MyNavLink from "../components/MyNavLink";
import News from "./homeNews";
import Messages from "./homeMessages";
export default class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home 组件内容</h2>
        <ul className="nav nav-tabs">
          <li>
            <MyNavLink to="/home/news">News</MyNavLink>
          </li>
          <li>
            <MyNavLink to="/home/messages">Messages</MyNavLink>
          </li>
        </ul>
        <div>
          <Switch>
            <Route path="/home/news" component={News}></Route>
            <Route path="/home/messages" component={Messages}></Route>
            <Redirect to="/home/news"></Redirect>
          </Switch>
        </div>
      </div>
    );
  }
}
