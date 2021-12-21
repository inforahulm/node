const http = require("http");
const express = require('express');

const app = express();

const server = http.createServer(app);
const port = process.env.PORT || 3000;



// http.listen(8000);

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})  

const io = require('socket.io')(server)

const users = {};   
io.on('connection', (socket) => {
 
    socket.on('new-user-joined', name => {

        users[socket.id]=name;
        console.log(users)
        socket.emit('user-joied', name)
     
    });

    // socket.on('send',message =>{
    //     socket.broadcast.emit('receive', {
    //         message:message,name: users[socket.id]
    //     })
    // })

})


server.listen(port,()=>{
    console.log("server start"+port)
});