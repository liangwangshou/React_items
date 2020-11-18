import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { NavBar } from "antd-mobile";

import Teacher from "../teacher/teacher";
import TeacherInfo from "../teacherinfo/teacherinfo";
import Student from "../student/student";
import StudentInfo from "../studentinfo/studentinfo";
import Personal from "../personal/personal";
import Message from "../message/message";
import Chat from "../chat/chat";
import { getUser } from "../../redux/actions";
import { getRedirectPath } from "../../utils/index";
import NavFooter from "../../components/nav-footer/nav-footer";

class Main extends Component {
  navList = [
    {
      path: "/teacher", // 路由路径
      component: Teacher,
      title: "学生列表",
      icon: "student",
      text: "学生",
    },
    {
      path: "/student", // 路由路径
      component: Student,
      title: "老师列表",
      icon: "teacher",
      text: "老师",
    },
    {
      path: "/message", // 路由路径
      component: Message,
      title: "消息列表",
      icon: "message",
      text: "消息",
    },
    {
      path: "/personal", // 路由路径
      component: Personal,
      title: "用户中心",
      icon: "personal",
      text: "个人",
    },
  ];
  componentDidMount() {
    const userid = Cookies.get("userid");
    const { user } = this.props;
    if (userid && !user._id) {
      this.props.getUser();
    }
  }
  render() {
    const pathname = this.props.location.pathname;
    const userid = Cookies.get("userid");
    if (!userid) {
      return <Redirect to="/login"></Redirect>;
    }
    const { user } = this.props;
    if (!user._id) {
      return null;
    } else {
      if (pathname === "/") {
        const path = getRedirectPath(user.type, user.header);
        return <Redirect to={path}></Redirect>;
      }
    }
    if (user.type === "teacher") {
      this.navList[1].hide = true;
    } else {
      this.navList[0].hide = true;
    }
    const currentNav = this.navList.find((nav) => nav.path === pathname);
    const unReadCount = this.props.unReadCount;
  //  console.log(unReadCount);
    return (
      <div>
        {currentNav ? (
          <NavBar className="stick-top">{currentNav.title}</NavBar>
        ) : null}{" "}
        <Switch>
          {this.navList.map((nav, index) => (
            <Route key={index} path={nav.path} component={nav.component} />
          ))}
          <Route path="/teacherinfo" component={TeacherInfo}></Route>
          <Route path="/studentinfo" component={StudentInfo}></Route>
          <Route path="/chat/:userid" component={Chat}></Route>
        </Switch>
        {currentNav ? (
          <NavFooter
            navList={this.navList}
            unReadCount={unReadCount}
          ></NavFooter>
        ) : null}{" "}
      </div>
    );
  }
}
export default connect(
  (state) => ({ user: state.user, unReadCount: state.chat.unReadCount }),
  { getUser }
)(Main);
