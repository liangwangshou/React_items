/*包含 n 个接口请求函数的模块
每个函数返回的都是 promise 对象
*/
import ajax from "./ajax";
// 请求注册
export const reqRegister = (user) => ajax("/register", user, "POST");
// 请求登陆
export const reqLogin = (user) => ajax("/login", user, "POST");
export const reqUpdateUser = (user) => ajax("/update", user, "POST");
export const reqUser = () => ajax("/user");
export const reqUserList = (type) => ajax("/userlist", {
  type
});
//获取当前用户的聊天信息列表
export const reqChatMsgList = () => ajax("/msglist");
//修改指定消息为已读
export const reqReadMsg = (from) => ajax("/readmsg", {
  from
}, "POST"); //from为发送给消息用户的id