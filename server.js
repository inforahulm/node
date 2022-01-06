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

const io = require('socket.io')(server);

const mysql = require("mysql");

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root@123",
    database:"chat"
});  

connection.connect(function(error){

});

const users = {};   


io.on('connection',(socket)=>{
    socket.on('new-user-joined',(username)=>{
        users[socket.id] = username;
        socket.broadcast.emit('user-connected',username);
        io.emit('user-list',users);
      
    });

    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected',user=users[socket.id]);
        delete users[socket.id];
        io.emit('user-list',users);
    });

    socket.on('message',(data)=>{
        socket.broadcast.emit('message',data);
        connection.query("INSERT INTO messages (message,user) VALUES ('" + data.msg + "','" + data.user + "')",function(error,result) {

        });
    });
});


server.listen(port,()=>{
    console.log("server start"+port)
});