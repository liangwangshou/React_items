import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import HeaderSelector from "../../components/header-selector/header-selector";
import { updateUser } from "../../redux/actions";
import { Redirect } from "react-router-dom";
class DashenInfo extends Component {
  state = {
    header: "", // 头像名称
    post: "", // 职位
    info: "", // 个人或职位简介
    company: "", // 公司名称
    salary: "", // 工资
  };
  handleChange = (name, val) =>
    this.setState({
      [name]: val,
    });
  save = () => {
    this.props.updateUser(this.state);
  };
  setHeader = (header) => {
    this.setState({ header });
  };
  render() {
    const { header, type } = this.props.user;
    if (header) {
      const path = type === "dashen" ? "/dashen" : "/laoban";
      return <Redirect to={path}></Redirect>;
    }
    return (
      <div>
        <NavBar>大神信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}></HeaderSelector>
        <InputItem
          placeholder="请输入招聘职位"
          onChange={(val) => {
            this.handleChange("post", val);
          }}
        >
          求职岗位:
        </InputItem>
        <TextareaItem title="个人介绍" rows={3} />
        <Button
          type="primary"
          onChange={(val) => {
            this.handleChange("info", val);
          }}
          onClick={this.save}
        >
          保&nbsp;&nbsp;&nbsp;存
        </Button>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { updateUser })(
  DashenInfo
);
