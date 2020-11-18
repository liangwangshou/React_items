import React, { Component } from "react";
import PropTypes from "prop-types";
import { TabBar } from "antd-mobile";
import { withRouter } from "react-router-dom";
const Item = TabBar.Item;
class NavFooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired,
    unReadCount: PropTypes.number.isRequired
  };
  render() {
    let { navList, unReadCount } = this.props;
    const { pathname } = this.props.location;
    navList = navList.filter((nav) => !nav.hide);
    return (
      <TabBar>
        {navList.map((nav, index) => (
          <Item
            key={index}
            badge={nav.path === '/message' ? unReadCount : 0}
            title={nav.text}
            icon={{ uri: require(`./imgs/${nav.icon}.png`) }}
            selectedIcon={{ uri: require(`./imgs/${nav.icon}-selected.png`) }}
            selected={pathname === nav.path}
            onPress={() => {
              this.props.history.replace(nav.path); //新的path
            }}
          >
            {/* {console.log(nav, index)} */}
          </Item>
        ))}
      </TabBar>
    );
  }
}
export default withRouter(NavFooter);
