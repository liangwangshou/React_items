import {
  Add,
  Del
} from "./action-type";
const comments = [{
  username: "张三",
  content: "张三学习React"
}, {
  username: "李四",
  content: "李四学习React"
}];
const commentReducer = function (state = comments, action) {
  switch (action.type) {
    case Add:
      return [action.data, ...state];
    case Del:
      return state.filter((comment, index) => {
        return index !== action.data;
      });
    default:
      return state
  }
};
export default commentReducer