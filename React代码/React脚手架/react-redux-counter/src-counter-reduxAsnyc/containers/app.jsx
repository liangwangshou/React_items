import { connect } from "react-redux";

import Counter from "../components/counter";

import { increment, decrement, incrementAsync } from "../redux/action";
// 向外暴露连接App组件的包装组件
export default connect((state) => ({ count: state }), {
  increment,
  decrement,
  incrementAsync,
})(Counter);
