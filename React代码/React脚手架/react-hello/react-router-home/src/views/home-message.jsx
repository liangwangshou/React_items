import React, { Component } from "react";
import { Route } from "react-router-dom";
import MyNavLink from "../component/MyNavLink";
import MessageDetail from "./messageDetail";
export default class Message extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      const messages = [
        { id: 1, title: "message001" },
        { id: 2, title: "message002" },
        { id: 3, title: "message003" },
      ];
      this.setState({ messages });
    }, 1000);
  }
  componentWillMount() {
    clearTimeout(this.timer);
  }
  pushLook = (id) => {
    this.props.history.push(`/home/message/messagedetail/${id}`);
  };
  replaceLook = (id) => {
    this.props.history.replace(`/home/message/messagedetail/${id}`);
  };
  back = () => {
    this.props.history.goBack();
  };
  forward = () => {
    this.props.history.goForward();
  };
  reqPage = () => {
    window.location = "http://www.baidu.com";
  };
  render() {
    return (
      <div>
        <ul>
          {this.state.messages.map((msg, index) => (
            <li key={index}>
              <MyNavLink to={`/home/message/messagedetail/${msg.id}`}>
                {msg.title}
              </MyNavLink>
              &nbsp;&nbsp;
              <button
                onClick={() => {
                  this.pushLook(msg.id);
                }}
              >
                push()查看
              </button>
              &nbsp;&nbsp;
              <button
                onClick={() => {
                  this.replaceLook(msg.id);
                }}
              >
                {" "}
                replace()查看
              </button>
            </li>
          ))}
          <p>
            <button onClick={this.back}>回退</button>
            <button onClick={this.forward}>前进</button>
          </p>
          <p>
            <button onClick={this.reqPage}>页面跳转</button>
          </p>
        </ul>

        <Route
          path="/home/message/messagedetail/:id"
          component={MessageDetail}
        ></Route>
      </div>
    );
  }
}
