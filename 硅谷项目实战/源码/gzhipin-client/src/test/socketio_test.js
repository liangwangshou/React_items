import io from 'socket.io-client'

//得到与服务器的连接对象
const socket = io('ws://localhost:4000')
socket.on('receiveMsg', function (data) {
    console.log('客户端接收服务器发送的消息', data);
})
socket.emit('sendMsg', {
    name: 'abc'
})
console.log('客户端向服务器发送消息', {
    name: 'abc'
});