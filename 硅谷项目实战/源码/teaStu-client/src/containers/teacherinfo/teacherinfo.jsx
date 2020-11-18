import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";

import HeaderSelector from "../../components/header-selector/header-selector";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { updateUser } from "../../redux/actions";

class TeacherInfo extends Component {
  state = {
    header: "", // 头像名称
    info: "", // 职位简介
    post: "", // 职位名称
    company: "", // 公司名称
    salary: "", // 工资
  };
  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  };
  setHeader = (header) => {
    this.setState({ header });
  };
  render() {
    const { user } = this.props;
    if (user.header) {
      return <Redirect to="/teacher"></Redirect>;
    }
    return (
      <div>
        <NavBar>老师信息完善页面</NavBar>
        <HeaderSelector setHeader={this.setHeader}></HeaderSelector>
        <InputItem onChange={(val) => this.handleChange("post", val)}>
          招聘职位:
        </InputItem>
        <InputItem onChange={(val) => this.handleChange("company", val)}>
          公司名称:
        </InputItem>
        <InputItem onChange={(val) => this.handleChange("salary", val)}>
          职位薪资:
        </InputItem>
        <TextareaItem
          title="职位要求"
          rows={3}
          onChange={(val) => this.handleChange("info", val)}
        ></TextareaItem>
        <Button
          type="primary"
          onClick={() => this.props.updateUser(this.state)}
        >
          保存
        </Button>
      </div>
    );
  }
}
export default connect((state) => ({ user: state.user }), { updateUser })(
  TeacherInfo
);
