import React, { Component } from "react";
import { NavBar, List, InputItem, Grid, Icon } from "antd-mobile";
import { connect } from "react-redux";
import { sendMsg, readMsg } from "../../redux/actions";
import QueueAnim from 'rc-queue-anim'

const Item = List.Item;
class Chat extends Component {
  state = {
    content: "",
    isShow: false,
  };
  componentDidMount() {
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight);
  }
  componentDidUpdate() {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight);

  }
  componentWillUnmount() {
    //发请求更新消息的未读状态
    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readMsg(from, to)
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
    // console.log(this.emojis);
  }
  toggleShow = () => {
    const isShow = !this.state.isShow;
    this.setState({ isShow });
    if (isShow) {
      // 异步手动派发 resize 事件,解决表情列表显示的 bug
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 0);
    }
  };
  handleSend = () => {
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    const content = this.state.content.trim();
    //发送请求
    if (content) {
      this.props.sendMsg({ from, to, content });
    }
    this.setState({ content: "", isShow: false });
  };
  render() {
    const { user } = this.props;
    const { users, chatMsgs } = this.props.chat;
    const targetId = this.props.match.params.userid;

    //计算当前聊天的chatId
    const meId = user._id;
    if (users[meId] === undefined) {
      //如果还没有获取数据，直接不做任何显示
      return null;
    }
    const chatId = [meId, targetId].sort().join("_");
    //过滤  chatmsgs
    // debugger;
    const msgs = chatMsgs.filter((msg) => msg.chat_id === chatId);
    //判断users是否有数据
    //得到目标用户的header图片对象
    const targetHeader = users[targetId].header;
    const targetName = users[targetId].username;
    const targetIcon = targetHeader
      ? require(`../../assets/imgs/${targetHeader}.png`)
      : null;
    return (
      <div id="chat-page">
        <NavBar
          className="sticky-header"
          icon={<Icon type="left"></Icon>}
          onLeftClick={() => this.props.history.goBack()}
        >
          {targetName}
        </NavBar>
        <List style={{ marginBottom: 50, marginTop: 50 }}>
          {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
          <QueueAnim type='scale' delay={100}>
            {msgs.map((msg) => {
              if (targetId === msg.from) {
                // targetId === msg.from 我给对方的
                return (
                  <Item key={msg._id} thumb={targetIcon}>
                    {msg.content}
                  </Item>
                );
              } else {
                //     meId===msg.to   对方给我的
                return (
                  <Item key={msg._id} className="chat-me" extra="我">
                    {msg.content}
                  </Item>
                );
              }
            })}
          </QueueAnim>
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
          />
          {this.state.isShow ? (
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(item) => {
                this.setState({ content: this.state.content + item.text });
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
export default connect((state) => ({ user: state.user, chat: state.chat }), {
  sendMsg, readMsg
})(Chat);
