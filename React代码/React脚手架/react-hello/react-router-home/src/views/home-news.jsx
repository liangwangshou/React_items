import React, { Component } from "react";

export default class News extends Component {
  state = {
    newArr: ["message004", "message005", "message006"],
  };
  render() {
    return (
      <ul>
        {this.state.newArr.map((arr, index) => (
          <li key={index}>{arr}</li>
        ))}
      </ul>
    );
  }
}
