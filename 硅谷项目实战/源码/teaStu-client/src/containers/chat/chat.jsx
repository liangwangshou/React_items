import React, { Component } from "react";
import { NavBar, List, InputItem, Icon, Grid } from "antd-mobile";
import { connect } from "react-redux";

import { sendMsg, readMsg } from "../../redux/actions";

const Item = List.Item;

class Chat extends Component {
  componentDidMount() {
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight);
    
  }
  componentDidUpdate() {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight);
  }
  componentWillUnmount() {
    const from = this.props.match.params.userid;
    const to = this.props.user._id;
    this.props.readMsg(from, to);
  }
  componentWillMount() {
    this.emojis = [
      "😊", //
      "😃",
      "😁",
      "🤣",
      "🙃",
      "😂",
      "🥰",
      "😘",
      "😜",
      "😀",
      "😊",
      "😃",
      "😁",
      "🤣",
      "🙃",
      "😂",
      "🥰",
      "😘",
      "😜",
      "😀",
      "😊",
      "😃",
      "😁",
      "🤣",
      "🙃",
      "😂",
      "🥰",
      "😘",
      "😜",
      "😀",
      "😊",
      "😃",
      "😁",
      "🤣",
      "🙃",
      "😂",
      "🥰",
      "😘",
      "😜",
      "😀",
    ];
    this.emojis = this.emojis.map((value) => ({ text: value }));
  }
  state = {
    content: "",
    isShow: false,
  };
  handleSend = () => {
    const content = this.state.content.trim();
    const to = this.props.match.params.userid;
    const from = this.props.user._id;
    this.props.sendMsg({ from, to, content });
    this.setState({ content: "", isShow: false });
  };
  toggleShow = () => {
    const isShow = !this.state.isShow;
    this.setState({ isShow });
    if (isShow) {
      setTimeout(() => {
        // 异步手动派发 resize 事件,解决表情列表显示的 bug
        window.dispatchEvent(new Event("resize"));
      }, 0);
    }
  };
  render() {
    const { user } = this.props;
    const { chatMsgs, users } = this.props.chat;
    const targetId = this.props.match.params.userid;
    const meId = user._id;
    if (!users[meId]) {
      return null;
    }
    //console.log(targetId);
    const chatId = [targetId, meId].sort().join("_");
    const targetName = users[targetId].username;
    //console.log(chatMsgs);
    const msgs = chatMsgs.filter((msg) => msg.chatId !== chatId);
    const targetIcon = users[targetId]
      ? require(`../../assets/imgs/${users[targetId].header}.png`)
      : null;
    // console.log(msgs);
    return (
      <div id="chat-page">
        <NavBar
          className="stick-top"
          icon={<Icon type="left"></Icon>}
          onLeftClick={() => this.props.history.goBack()}
        >
          {targetName}
        </NavBar>
        <List style={{ marginBottom: 50, marginTop: 50 }}>
          {msgs.map((msg) => {
            console.log(msg);
            if (msg.from === targetId) {
              return (
                <Item key={msg._id} thumb={targetIcon}>
                  {msg.content}
                </Item>
              );
            } else {
              return (
                <Item key={msg._id} className="chat-me" extra="我">
                  {msg.content}
                </Item>
              );
            }
          })}
        </List>
        <div className="am-tab-bar">
          <InputItem
            placeholder="请输入"
            value={this.state.content}
            onChange={(val) => this.setState({ content: val })}
            onFocus={() => this.setState({ isShow: false })}
            extra={
              <span>
                <span onClick={this.toggleShow} style={{ marginRight: 10 }}>
                  {this.emojis[0].text}
                </span>
                <span onClick={this.handleSend}>发送</span>
              </span>
            }
          ></InputItem>
          {this.state.isShow ? (
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(item) => {
                this.setState({ content: this.state.content + item.text });
              }}
            ></Grid>
          ) : null}
        </div>
      </div>
    );
  }
}
export default connect((state) => ({ user: state.user, chat: state.chat }), {
  sendMsg,
  readMsg,
})(Chat);
