/*包含多个用于生成新的 state 的 reducer 函数的模块
 */
import {
  combineReducers
} from "redux";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USERLIST,
  RECEIVE_MSGLIST,
  RECEIVEA_MSG,
  MSG_READ
} from "./action-types";
import {
  getRedirectPath
} from '../utils/index'

const initUser = {
  username: "", // 用户名
  type: "", // 类型
  msg: "", // 错误提示信息
  redirectTo: "", // 需要自动跳转的路由 path
};

function user(state = initUser, action) {
  //console.log(action);
  switch (action.type) {
    case AUTH_SUCCESS:
      const redirectTo = getRedirectPath(action.data.type, action.data.header)
      return {
        ...action.data, redirectTo
      };
    case ERROR_MSG:
      return {
        ...state, msg: action.data
      };
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return {
        ...initUser, msg: action.data
      }
      default:
        return state;
  }
}
const initUserList = []

function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USERLIST:
      return action.data
    default:
      return state
  }
}

const initChat = {
  chatMsgs: [],
  users: {},
  unReadCount: 0
}

function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVEA_MSG:
      const {
        chatMsg
      } = action.data
      //console.log(state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid ? 1 : 0));
      return {
        users: state.users,
          chatMsgs: [...state.chatMsgs, chatMsg],
          unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid ? 1 : 0)
      }
    case RECEIVE_MSGLIST:
        const {
          chatMsgs, users, userid
        } = action.data
        // console.log(chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to === userid) ? 1 : 0, 0));
        return {
          users,
          chatMsgs,
          unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to === userid ? 1 : 0), 0)
        }
    case MSG_READ:
          const {
            from, to, count
          } = action.data
          return {
            users: state.users,
              chatMsgs: state.chatMsgs.map(msg => {
                if (msg.from === from && msg.to === to && !msg.read) {
                  return {
                    ...msg,
                    read: true
                  }
                } else {
                  return msg
                }
              }),
              unReadCount: state.unReadCount - count
          }
    default:
            return state
  }
}
// 返回合并后的 reducer 函数
export default combineReducers({
  user,
  userList,
  chat
});