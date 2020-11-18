import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import counter from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
// 根据counter函数创建store对象
const store = createStore(
  counter,
  composeWithDevTools(applyMiddleware(thunk)) // 应用上异步中间件
);

export default store;
