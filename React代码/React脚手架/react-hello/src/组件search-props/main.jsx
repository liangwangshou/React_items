import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
export default class Main extends Component {
  state = {
    initView: true,
    loading: false,
    errorMsg: null,
    users: null,
  };
  static propTypes = {
    searchName: PropTypes.string.isRequired,
  };
  componentWillReceiveProps(newProps) {
    const { searchName } = newProps;
    this.setState({
      initView: false,
      loading: true,
    });
    const url = `http://m.ctrip.com/restapi/h5api/globalsearch/search?userid=M2208559994&source=mobileweb&action=mobileweb&keyword=${searchName}`;
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const users = result.data.map((item) => ({
          name: item.word,
          nameUrl: item.url,
          namePlace: item.districtname,
        }));
        this.setState({ loading: false, users });
      })
      .catch((error) => {
        this.setState({ loading: false, errorMsg: error.message });
      });
  }
  render() {
    const { initView, loading, errorMsg, users } = this.state;
    console.log(users);
    if (initView) {
      // console.log(this.props.searchName);
      return <h2>请输入内容进行搜索</h2>;
    } else if (loading) {
      return <h2>loading...</h2>;
    } else if (errorMsg) {
      return <h2>{errorMsg}</h2>;
    } else {
      return (
        <div className="row">
          {users.map((user, index) => (
            <div className="card" key={index}>
              <a href={user.nameUrl} target="_blank" rel="noopener noreferrer">
                {user.name}
              </a>
              <p className="card-text">{user.namePlace}</p>
            </div>
          ))}
        </div>
      );
    }
  }
}
