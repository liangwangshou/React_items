import React, { Component } from "react";
export default class Detail extends Component {
  render() {
    const MessageAll = [
      { id: 1, title: "message001", content: "第一只土豆" },
      { id: 2, title: "message002", content: "第二只土豆" },
      { id: 3, title: "message003", content: "第三只土豆" },
    ];
    const { id } = this.props.match.params;
    const msgFind = MessageAll.find((msg) => id * 1 === msg.id);
    return (
      <ul>
        <li>id:{msgFind.id}</li>
        <li>title:{msgFind.title}</li>
        <li>content:{msgFind.content}</li>
      </ul>
    );
  }
}
