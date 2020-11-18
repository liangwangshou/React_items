import {
    INCREMENT,
    DECREMENT
} from "./action-types";
//包含所有 action creator
//同步返回对象
//异步返回函数
export const increment = (number) => ({
    type: INCREMENT,
    data: number
})
export const decrement = (number) => ({
    type: DECREMENT,
    data: number
})
//异步action
export const incrementAsync = (number) => {
    return dispatch => {
        setTimeout(() => {
            //1秒之后才去分发增加一个cation
            console.log(dispatch);
            dispatch(increment(number))
        }, 1000)
    }
}