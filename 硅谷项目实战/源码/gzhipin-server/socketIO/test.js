// module.exports = function (sever) {
//     const io = require('socket.io')(sever)
//     //监视客户端与服务器的连接
//     io.on('connection', function (socket) {
//         console.log('有一个客户端连接上了服务器');
//         socket.on('sendMsg', function (data) {
//             console.log(data);
//             data.name = data.name.toUpperCase()
//             io.emit('receiveMsg', data)
//         })

//     })
// }