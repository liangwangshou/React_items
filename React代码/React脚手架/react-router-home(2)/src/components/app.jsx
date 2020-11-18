import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import MyNavLink from "./MyNavLink";
import About from "../views/about";
import Home from "../views/home";

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header">
              <h2>React Router Demo</h2>
              <div>{console.log("11")}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              <MyNavLink to="/about" className="list-group-item">
                about
              </MyNavLink>
              <MyNavLink to="/home" className="list-group-item">
                home
              </MyNavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                <Switch>
                  <Route path="/about" component={About}></Route>
                  <Route path="/home" component={Home}></Route>
                  <Redirect to="/about"></Redirect>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
