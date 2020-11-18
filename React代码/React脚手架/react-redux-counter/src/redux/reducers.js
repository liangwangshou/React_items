import {
    combineReducers
} from 'redux'

import {
    Add,
    Del,
    Get,
    INCREMENT,
    DECREMENT
} from './action-types'


function counter(state = 0, action) {
    switch (action.type) {
        case INCREMENT:
            return state + action.data;
        case DECREMENT:
            return state - action.data;
        default:
            return state;
    }
}
const comments = [];

function commentReducer(state = comments, action) {
    switch (action.type) {
        case Add:
            return [action.data, ...state];
        case Del:
            return state.filter((comment, index) => {
                // console.log(comment, index, action.data);
                return index !== action.data;

            });
        case Get:
            return action.data;
        default:
            return state
    }
}
export default combineReducers({
    counter,
    commentReducer
})