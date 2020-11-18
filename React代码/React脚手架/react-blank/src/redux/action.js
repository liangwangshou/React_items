import {Add,Del } from './action-type'
export const handleAdd=(comment)=>({
    type:Add,
    data:comment
})
export const handleDel=(index)=>({
    type:Del,
    data:index
})