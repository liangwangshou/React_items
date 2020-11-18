const {
    model
} = require("mongoose");

module.exports = function (sever) {
    const {
        ChatModel
    } = require('../db/model')
    const io = require('socket.io')(sever)
    io.on('connection', function (socket) {
        socket.on('sendMsg', function ({
            from,
            to,
            content
        }) {
            const chat_id = [from, to].sort().join('_')
            const create_time = Date.now()
            new ChatModel({
                chat_id,
                from,
                to,
                create_time,
                content
            }).save(function (err, chatMsg) {
                io.emit('receiveMsg', chatMsg)
            })
        })
    })

}