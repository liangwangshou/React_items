import React, { Component } from "react";
import { Card, WingBlank, WhiteSpace } from "antd-mobile";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import QueueAnim from 'rc-queue-anim'
const Header = Card.Header;
const Body = Card.Body;
class UserList extends Component {
  static propTypes = {
    userListState: PropTypes.array.isRequired,
  };
  render() {
    const { userListState } = this.props;
    // console.log(userListState);
    return (
      <WingBlank style={{ marginBottom: 50, marginTop: 50 }}>
        <QueueAnim type='scale' delay={100}>
          {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
          {userListState.map((user) => (
            <div key={user._id}>
              <WhiteSpace></WhiteSpace>
              <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                <Header
                  thumb={
                    user.header
                      ? require(`../../assets/imgs/${user.header}.png`)
                      : null
                  }
                  extra={user.username}
                ></Header>
                <Body>
                  <div>职位: {user.post}</div>
                  {user.company ? <div>公司: {user.company}</div> : null}
                  {user.salary ? <div>月薪: {user.salary}</div> : null}
                  <div>描述: {user.info}</div>
                </Body>
              </Card>
            </div>
          ))}
        </QueueAnim>
      </WingBlank>
    );
  }
}
export default withRouter(UserList);
