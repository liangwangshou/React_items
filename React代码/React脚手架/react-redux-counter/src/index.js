import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/app/app";
import {
  Provider
} from 'react-redux'
import store from './redux/store'
// import "./index.css";
ReactDOM.render( <
    Provider store = {
      store
    } >
    <
    App / >
    <
    /Provider >, document.querySelector("#root"));