/*对话消息列表组件
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile";
const Item = List.Item;
const Brief = Item.Brief;
//对chatMsgs按chat_id进行分组，并且得到每个组的lastMsg组成的数组
//1 找出每个聊天的LastMsg，并且一个对象容器来保存{chat_id,lastMsg}
//2 得到所有lastMsg的数组
//3 对数组进行排序(按照create_time)
function getLastMsgs(chatMsgs, userid) {
  //1 找出每个聊天的lastMsg，并且一个对象容器来保存{chat_id,lastMsg}
  const lastMsgsObjs = {};
  chatMsgs.forEach((msg) => {
    //对msg进行个体的统计  并且为msg对象添加unReadCount属性
    if (msg.to === userid && !msg.read) {//未读消息  给我的
      msg.unReadCount = 1
    } else {
      msg.unReadCount = 0
    }
    const chatId = msg.chat_id;
    const lastMsg = lastMsgsObjs[chatId]; //新的信息（对象）
    if (lastMsg === undefined) {
      lastMsgsObjs[chatId] = msg; //第一条信息信息（对象）并保存在lastMsgObjs中
    } else {
      //累加unReadCount=已经统计的+当前msg的
      const unReadCount = lastMsg.unReadCount + msg.unReadCount
      //如果msg比lastMsg晚，就将msg保存为lastMsg
      if (msg.create_time > lastMsg.create_time) {
        lastMsgsObjs[chatId] = msg;
      }
      //将unReadCount保存在最新的lastMsg上
      lastMsgsObjs[chatId].unReadCount = unReadCount
    }
  });
  //2 得到所有lastMsg的数组
  const lastMsgs = Object.values(lastMsgsObjs);
  //3 对数组进行排序(按照create_time)
  lastMsgs.sort(function (msg1, msg2) {
    //结果小于零 msg1放在前面，等于零不变，大于零反之
    return msg2.create_time - msg1.create_time;
  });
  return lastMsgs;
}
class Message extends Component {
  render() {
    const { user } = this.props;
    const { users, chatMsgs } = this.props.chat;
    //对chatMsg按照chat_id分组
    const lastMsgs = getLastMsgs(chatMsgs, user._id);
    // console.log(chatMsgs.reduce((preTotal, msg) => {
    //   console.log(preTotal, msg);
    //   return (preTotal + (!msg.read && msg.to === user._id))
    // }, 0));

    return (
      <List style={{ marginTop: 50, marginBottom: 50 }}>
        {lastMsgs.map((msg) => {
          //得到目标用户的id
          const targetUserId = msg.from === user._id ? msg.to : msg.from;
          //得到目标用户的信息
          const targetUser = users[targetUserId];
          // console.log(msg.from, msg.to, user._id);
          // console.log(targetUser);
          return (
            <Item
              key={msg._id}
              extra={<Badge text={msg.unReadCount} />}
              thumb={require(`../../assets/imgs/${targetUser.header}.png`)}
              arrow="horizontal"
              onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
            >
              {msg.content}
              <Brief>{targetUser.username}</Brief>
            </Item>
          );
        })}
      </List>
    );
  }
}
export default connect(
  (state) => ({ user: state.user, chat: state.chat }),
  {}
)(Message);
