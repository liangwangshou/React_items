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
  reqLogin,
  reqRegister,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqChatList,
  reqReadMsg
} from "../api/index";
import io from 'socket.io-client'

const errorMsg = (msg) => ({
  type: ERROR_MSG,
  data: msg
});
const authSuccess = (user) => ({
  type: AUTH_SUCCESS,
  data: user
});
const receiveUser = (user) => ({
  type: RECEIVE_USER,
  data: user
})
export const resetUser = (msg) => ({
  type: RESET_USER,
  data: msg
})
const receiveUserList = (users) => ({
  type: RECEIVE_USERLIST,
  data: users
})
const receiveMsgList = ({
  users,
  chatMsgs,
  userid
}) => ({
  type: RECEIVE_MSGLIST,
  data: {
    users,
    chatMsgs,
    userid
  }
})
const receiveMsg = (chatMsg, userid) => ({
  type: RECEIVEA_MSG,
  data: {
    chatMsg,
    userid
  }
})
const msgRead = ({
  count,
  from,
  to
}) => ({
  type: MSG_READ,
  data: {
    count,
    from,
    to
  }
})

export function register({
  username,
  password,
  password2,
  type
}) {
  if (!username || !password) {
    return errorMsg("用户名密码必须输入");
  }
  if (password !== password2) {
    return errorMsg("密码和确认密码不同");
  }
  return async (dispatch) => {
    const response = await reqRegister({
      username,
      password,
      password2,
      type
    });
    const result = response.data;
    // console.log(result);
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id)
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
}
export function login({
  username,
  password
}) {
  if (!username || !password) {
    return errorMsg("用户名密码必须输入");
  }
  return async dispatch => {
    const response = await reqLogin({
      username,
      password
    })
    const result = response.data
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id)
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  }
}
export function updateUser(user) {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }

  }
}
export function getUser() {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id)
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}
export function getUserList(type) {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUserList(result.data))
    }
  }
}
var initIO = function (dispatch, userid) {
  if (!io.socket) {
    io.socket = io('ws://localhost:5000')
    io.socket.on('receiveMsg', (chatMsg) => { 
      if (chatMsg.from === userid || chatMsg.to === userid) {
        dispatch(receiveMsg(chatMsg, userid))
      }
    })
  }
}
export const sendMsg = ({
  from,
  to,
  content
}) => {
  return async dispatch => {
    io.socket.emit('sendMsg', {
      from,
      to,
      content
    })
  }
}
async function getMsgList(dispatch, userid) {
  initIO(dispatch, userid)
  const response = await reqChatList()
  const result = response.data
  if (result.code === 0) {
    const {
      chatMsgs,
      users
    } = result.data
    dispatch(receiveMsgList({
      users,
      chatMsgs,
      userid
    }))
  }
}
export const readMsg = (from, to) => {
  return async dispatch => {
    const response = await reqReadMsg(from)
    const result = response.data
    if (result.code === 0) {
      const count = result.data
      dispatch(msgRead({
        count,
        from,
        to
      }))
    }
  }
}