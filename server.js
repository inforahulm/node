const http = require("http");
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mysql = require("mysql");
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash');


const app = express();
app.set('view engine', 'ejs');

const dotenv = require('dotenv');
dotenv.config();

app.use(session({
        secret: 'woot',
        cookie: {
            expires: 3600000
        },
        saveUninitialized: true,
        resave: true
    }));

app.use(cookieParser())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

express.application.prefix = express.Router.prefix = function (path, configure) {
    let router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
};
const routes = require('./rotues/index');

app.use(express.static("public"));


app.use('/', routes);


// http.listen(8000);



// app.get('/chat', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// }) 

const server = http.createServer(app);
const port = process.env.PORT || 3500;

const io = require('socket.io')(server);



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