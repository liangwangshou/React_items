/*
入口JS
 */
import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";
import {
  Provider
} from "react-redux";

import store from "./redux/store";
import Rigister from "./containers/register/register";
import Login from "./containers/login/login";
import Main from "./containers/main/main";
// import './test/socketio_test'
import "./assets/css/index.css";

// import './test/socketio_test'

ReactDOM.render( <
    Provider store = {
      store
    } >
    <
    HashRouter >
    <
    Switch >
    <
    Route path = "/register"
    component = {
      Rigister
    }
    /> <
    Route path = "/login"
    component = {
      Login
    }
    /> <
    Route path = "/"
    component = {
      Main
    }
    /> {
    /* <Redirect to='/login'></Redirect> */
  } <
  /Switch> < /
HashRouter > <
  /Provider>,
document.getElementById("root")
);