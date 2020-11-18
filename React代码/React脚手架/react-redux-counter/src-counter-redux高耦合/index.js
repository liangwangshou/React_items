import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app'
import store from './redux/store'


function render() {
    ReactDOM.render( < App store = {
            store
        }
        / > , document.querySelector('#root'))
    }
    render();

    //订阅监听(store中的状态变化了，就会自动调用进行重绘)
    store.subscribe(function () {
        render()
    })