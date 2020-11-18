import {
    Add,
    Del,
    Get
} from './action-types'
export const handleAdd = (comment) => ({
    type: Add,
    data: comment
})
export const handleDel = (index) => ({
    type: Del,
    data: index
})

const receiveComments = (comments) => ({
    type: Get,
    data: comments
})
export const getComments = () => {
    return dispatch => {
        setTimeout(() => {
            const comments = [{
                    username: "张三",
                    content: "张三学习React"
                },
                {
                    username: "李四",
                    content: "李四学习React"
                }
            ]
            dispatch(receiveComments(comments))
        }, 1000)
    }
}