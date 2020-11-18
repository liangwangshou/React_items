import React, { Component } from "react";
import { Route } from "react-router-dom";

import MyNavLink from "../components/MyNavLink";
import Detail from "./messagesDetail";
export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeMessages: [],
    };
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      const homeMessages = [
        { id: 1, title: "message001" },
        { id: 2, title: "message002" },
        { id: 3, title: "message003" },
      ];
      this.setState({
        homeMessages,
      });
    }, 1000);
  }
  handlePush = (id) => {
    this.props.history.push(`/home/message/messagedetail/${id}`);
  };
  handleReplace = (id) => {
    this.props.history.replace(`/home/message/messagedetail/${id}`);
  };
  handleBack = () => {
    this.props.history.goBack();
  };
  handleForward = () => {
    this.props.history.goForward();
  };
  handleHref = () => {
    window.location = "http://baidu.com";
  };
  render() {
    return (
      <div>
        <ul>
          {this.state.homeMessages.map((msg, index) => (
            <li key={index}>
              <MyNavLink to={`/home/messages/${msg.id}`}>{msg.title}</MyNavLink>
              <button
                onClick={() => {
                  this.handlePush(msg.id);
                }}
              >
                push()查看
              </button>
              <button
                onClick={() => {
                  this.handleReplace(msg.id);
                }}
              >
                replace()查看
              </button>
            </li>
          ))}
          <button onClick={this.handleBack}>回退</button>
          <button onClick={this.handleForward}>前进</button>
          <button onClick={this.handleHref}>页面跳转</button>
        </ul>
        <Route path="/home/messages/:id" component={Detail}></Route>
      </div>
    );
  }
}
