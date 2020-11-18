import React, { Component } from "react";
export default class News extends Component {
  // state={
  //     homeNews:["message004", "message005", "message006"]
  // }
  render() {
    const homeNews = ["message004", "message005", "message006"];
    return (
      <ul>
        {homeNews.map((news, index) => {
          return <li key={index}>{news}</li>;
        })}
      </ul>
    );
  }
}
