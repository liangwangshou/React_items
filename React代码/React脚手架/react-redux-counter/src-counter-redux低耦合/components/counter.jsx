import React, { Component } from "react";

import PropTypes from "prop-types";

export default class Counter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
  };
  increment = () => {
    const number = this.select.value * 1;
    //调用store的方法更新状态
    this.props.increment(number);
    // debugger;
  };
  decrement = () => {
    const number = this.select.value * 1;
    //调用store的方法更新状态
    this.props.decrement(number);
  };
  incrementIfOdd = () => {
    const count = this.props.count;
    if (count % 2 === 1) {
      const number = this.select.value * 1;
      //调用store的方法更新状态
      this.props.increment(number);
    }
  };

  incrementAsync = () => {
    const number = this.select.value * 1;
    setTimeout(() => {
      //调用store的方法更新状态
      this.props.increment(number);
    }, 1000);
  };

  render() {
    const count = this.props.count;
    return (
      <div>
        <p>Click {count} times</p>
        <select ref={(select) => (this.select = select)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
        <button onClick={this.incrementIfOdd}>imcrement if odd</button>
        &nbsp;&nbsp;
        <button onClick={this.incrementAsync}>imcrement Async</button>
      </div>
    );
  }
}
