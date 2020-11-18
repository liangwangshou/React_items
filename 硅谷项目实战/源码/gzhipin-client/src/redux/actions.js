import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqChatMsgList,
  reqReadMsg
} from '../api/index'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG,
  RECEIVE_MSG_LIST,
  MSG_READ
} from './action-types'
import io from 'socket.io-client'

//单例对象
// 1. 创建对象之前，判断对象是否已经创建，只有没有采取创建
// 2. 创建对象之后，保存对象
function initIO(dispatch, userid) { //当前userid未知  需要传参传进来
  if (!io.socket) {
    //得到与服务器的连接对象
    io.socket = io('ws://localhost:4000')
    io.socket.on('receiveMsg', function (chatMsg) {
      console.log('客户端接收服务器发送的消息', chatMsg);
      //只有chatMsg与当前用户相关的消息，采取分发同步action保存消息（需要dispatch）
      if (userid === chatMsg.from || userid === chatMsg.to) {
        dispatch(receiveMsg(chatMsg, userid))
      }
    })
  }
}
// 异步获取消息列表数据
async function getMsgList(dispatch, userid) { //登陆成功/注册成功/获取用户成功均自动请求获取用户聊天信息列表
  initIO(dispatch, userid)
  const response = await reqChatMsgList()
  const result = response.data
  if (result.code === 0) {
    const {
      users,
      chatMsgs
    } = result.data
    // 分发同步action
    dispatch(receiveMsgList({
      users,
      chatMsgs,
      userid
    }))
  }
}

//读取消息的异步action
export const readMsg = (from,to) => {
  return  async dispatch=>{
    const response =await reqReadMsg(from)
    const result =response.data
    if(result.code===0){
      const count=result.data//count 后台进行查询({from,to,read: false})满足这三个条件的显示出来并且返回个数
      dispatch(msgRead({count,from,to}))//from 别人的id 别人给我发的  to 我的id 我收到的
    }
  }
}
const msgRead=({count,from,to})=>({
  type:MSG_READ,
  data:{count,from,to}
})
const authSuccess = (user) => ({
  type: AUTH_SUCCESS,
  data: user
})
const errorMsg = (msg) => ({
  type: ERROR_MSG,
  data: msg
})
const receiveUser = (user) => ({
  type: RECEIVE_USER,
  data: user
})
const receiveUserList = (users) => ({
  type: RECEIVE_USER_LIST,
  data: users
})
const receiveMsgList = ({  users,  chatMsgs,  userid}) => ({
  type: RECEIVE_MSG_LIST,
  data: {
    users,
    chatMsgs,
    userid
  }
})

const receiveMsg = (chatMsg, userid) => ({
  type: RECEIVE_MSG,
  data: {
    chatMsg,
    userid
  }
})
export const resetUser = (msg) => ({ // 同步重置用户
  type: RESET_USER,
  data: msg
})
//异步action
export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserList(type);
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveUserList(result.data))
    }
  }
}
export const register = ({
  username,
  password,
  password2,
  type
}) => {

  // 进行前台表单验证, 如果不合法返回一个同步 action 对象, 显示提示信息
  if (!username || !password || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (password !== password2) {
    return errorMsg('密码和确认密码不同')
  }
  return async dispatch => {
    //发送注册的异步ajax请求
    const response = await reqRegister({
      username,
      password,
      type
    })
    const result = response.data
    if (result.code === 0) { //成功
      getMsgList(dispatch, result.data._id)
      dispatch(authSuccess(result.data))
    } else { //失败
      dispatch(errorMsg(result.msg))
    }
  }
}
export const login = ({
  username,
  password
}) => {
  if (!username || !password) {
    return errorMsg('用户密码必须输入')
  }
  return async dispatch => {
    const response = await reqLogin({
      username,
      password
    })
    const result = response.data
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id)
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}
export const getUser = () => {
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
export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user);
    const result = response.data;
    if (result.code === 0) { //成功
      dispatch(receiveUser(result.data))
    } else { //失败
      dispatch(resetUser(result.msg))
    }
  }
}
export const sendMsg = ({
  from,
  to,
  content
}) => {
  return dispatch => {
    console.log('客户端发送给服务器的消息', {
      from,
      to,
      content
    });
    io.socket.emit('sendMsg', {
      from,
      to,
      content
    })
  }
}