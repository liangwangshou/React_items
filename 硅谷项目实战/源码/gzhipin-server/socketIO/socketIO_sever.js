const {
    ChatModel
} = require('../db/model')
module.exports = function (sever) {
    const io = require('socket.io')(sever)
    //监视客户端与服务器的连接
    io.on('connection', function (socket) {
        console.log('有一个客户端连接上了服务器');
        socket.on('sendMsg', function ({
            from,
            to,
            content
        }) {
            console.log('服务器接收到客户端发送的消息', {
                from,
                to,
                content
            });
            //处理数据(保存消息)
            //准备chatmsg对象的相关数据
            const chat_id = [from, to].sort().join('_') //from_to  or   to_from
            const create_time = Date.now()
            new ChatModel({
                from,
                to,
                content,
                chat_id,
                create_time
            }).save(function (err, chatMsg) {
                //向客户端发送消息
                //  socket.emit('receiveMsg',chatMsg) socket只是给我发
                io.emit('receiveMsg', chatMsg) //全局发消息  所有连接的客户端都去发                
            })
        })

    })
}