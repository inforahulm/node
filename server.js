const express = require('express')
const app = express()
const http = require('http').createServer(app)

http.listen(8000);

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})  

const io = require('socket.io')(http)

const users = {};   
io.on('connection', socket => {
    socket.on('new-user-joined', name => {

        users[socket.id]=name;
        socket.broadcast.emit('user-joied', name)
     
    })

    socket.on('send',message =>{
        socket.broadcast.emit('receive', {
            message:message,name: users[socket.id]
        })
    })

})