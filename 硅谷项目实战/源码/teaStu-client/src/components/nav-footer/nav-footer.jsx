import React, { Component } from "react";
import { TabBar } from "antd-mobile";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const Item = TabBar.Item;
class NavFooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired,
    unReadCount: PropTypes.number.isRequired,
  };
  render() {
    const pathname = this.props.location.pathname;
    let { navList, unReadCount } = this.props;
    navList = this.props.navList.filter((nav) => !nav.hide);
    console.log(unReadCount);
    return (
      <TabBar>
        {navList.map((nav) => (
          <Item
            key={nav.path}
            badge={nav.path === "/message" ? unReadCount : 0}
            title={nav.text}
            icon={{ uri: require(`./imgs/${nav.icon}.png`) }}
            selectedIcon={{ uri: require(`./imgs/${nav.icon}-selected.png`) }}
            selected={pathname === nav.path}
            onPress={() => {
              this.props.history.replace(nav.path);
            }}
          />
        ))}
      </TabBar>
    );
  }
}
export default withRouter(NavFooter);
