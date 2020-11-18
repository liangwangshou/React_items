/*应用主界面路由组件
 */
import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie"; //可以操作前端cookie对象set()/get()/remove()
import { NavBar } from "antd-mobile";

import LaobanInfo from "../laobanInfo/laobanInfo";
import DashenInfo from "../dashenInfo/dashenInfo";
import Dashen from "../dashen/dashen";
import Laoban from "../laoban/laoban";
import Personal from "../personal/personal";
import Message from "../message/message";
import Chat from "../chat/chat";
import NotFound from "../../components/not-found/not-found";
import { updateUser, getUser } from "../../redux/actions";
import { getRedirectTo } from "../../utils/index";
import NavFooter from "../../components/nav-footer/nav-footer";

class Main extends Component {
  // 组件类和组件对象
  // 给组件对象添加属性
  navList = [
    {
      path: "/laoban", // 路由路径
      component: Laoban,
      title: "大神列表",
      icon: "dashen",
      text: "大神",
    },
    {
      path: "/dashen", // 路由路径
      component: Dashen,
      title: "老板列表",
      icon: "laoban",
      text: "老板",
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
  componentDidMount = () => {
    //登陆过(cookie中有userid)，但没有登陆(redux管理的user中没有_id) 发请求获取对应的user
    const userid = Cookies.get("userid");
    const { _id } = this.props.user;
    if (userid && !_id) {
      //发送异步请求获取user信息
      //console.log("发送ajax请求");
      this.props.getUser();
    }
  };
  render() {
    const pathname = this.props.location.pathname;
    //读取cookie中的userid
    const userid = Cookies.get("userid");
    //如果没有，自动重定向到登陆界面
    if (!userid) {
      return <Redirect to="/login"></Redirect>;
    }
    //如果有，读取redux中的user状态
    const { user, unReadCount } = this.props;
    // debugger;
    //如果user没有_id，返回null（不做任何显示）
    if (!user._id) {
      return null;
    } else {
      //如果有_id，显示对应的界面
      //根据user的type和header来计算出一个重定向的路由路径，并自动重定向
      let path = this.props.location.pathname;
      if (path === "/") {
        path = getRedirectTo(user.type, user.header);
        return <Redirect to={path}></Redirect>;
      }
    }
    const currentNav = this.navList.find((nav) => nav.path === pathname);
    if (currentNav) {
      if (user.type === "laoban") {
        this.navList[1].hide = true;
      } else {
        this.navList[0].hide = true;
      }
    }

    return (
      <div>
        {currentNav ? (
          <NavBar className="sticky-header">{currentNav.title}</NavBar>
        ) : null}
        <Switch>
          {this.navList.map((nav, index) => (
            <Route key={index} path={nav.path} component={nav.component} />
          ))}
          <Route path="/laobaninfo" component={LaobanInfo} />
          <Route path="/dasheninfo" component={DashenInfo} />
          <Route path="/chat/:userid" component={Chat} />
          <Route path="/" component={NotFound} />
          {/* <Route path="/main/laoban" component={Laoban} />
          <Route path="/main/dashen" component={Dashen} /> */}
        </Switch>
        {currentNav ? (
          <NavFooter
            navList={this.navList}
            unReadCount={unReadCount}
          ></NavFooter>
        ) : null}
      </div>
    );
  }
}
export default connect(
  (state) => ({ user: state.user, unReadCount: state.chat.unReadCount }),
  {
    updateUser,
    getUser,
  }
)(Main);
// 一.实现自动登录
//  1.componentDidMount()
//    1）登陆过(cookie中有userid)，但没有登陆(redux管理的user中没有_id) 发请求获取对应的user
//  2.render()
//    2）如果cookie中没有userid自动进入login界面
//    3) 判断redux管理的userid是否有_id，如果没有，暂时不做显示
//    4）如果有了，说明当前已经登陆，显示对应的界面
//    5）如果请求根路径 根据user的type和header来计算出一个重定向的路由路径，并自动定向
