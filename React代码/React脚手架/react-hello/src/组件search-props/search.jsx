import React, { Component } from "react";
import PropTypes from "prop-types";
export default class Search extends Component {
  static propTypes = {
    setSearch: PropTypes.func.isRequired,
  };
  search = () => {
    const inputvalue = this.input.value;
    this.props.setSearch(inputvalue);
  };
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input
            type="text"
            placeholder="enter the name you search"
            ref={(input) => (this.input = input)}
          />
          <button onClick={this.search}>Search</button>
        </div>
      </section>
    );
  }
}
