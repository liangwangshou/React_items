import React from "react";
import {
    render
} from "react-dom";
import {
    BrowserRouter
} from "react-router-dom";

import App from "./component/app";
import '../src/css/activeClassName.css'

render(
        ( < BrowserRouter >
            <
            App / >
            <
            /BrowserRouter>),
            document.querySelector("#root")
        );