const socket = io();

var username;
var chats = document.querySelector('.chats');
var user_list = document.querySelector('.users-list');
var user_count = document.querySelector('.users-count');
var msg_send = document.querySelector('#user-send');
var user_msg = document.querySelector('#user-msg');

do{
    username = prompt('Enter your name: ');
}while(!username);

socket.emit("new-user-joined",username);

socket.on('user-connected',(socket_name)=>{
    userJoinLetf(socket_name,'joined');
}); 


socket.on('user-disconnected',(user)=>{
    userJoinLetf(user,'left');
}); 

function userJoinLetf(name,status){
    let div = document.createElement('div');
    div.classList.add('user-join');
    let content = `<p><b>${name}</b> ${status} the chat</p>`;
    div.innerHTML = content;
    chats.appendChild(div);
    chats.scrollTop = chats.scrollHeight;
}

socket.on('user-list',(users)=>{
    user_list.innerHTML = '';
    users_arr = Object.values(users);
    for(let i=0;i<users_arr.length;i++){
        let p = document.createElement('p');
        p.innerHTML = users_arr[i];
        user_list.appendChild(p);
    }
    user_count.innerHTML = users_arr.length;
});

msg_send.addEventListener('click',()=>{
    let data = {
        user: username,
        msg: user_msg.value
    };
    if(user_msg.value!=""){
        appendMessage(data,'outgoing');
        socket.emit('message',data);
        user_msg.value = "";
    }
});

function appendMessage(data,status){
    let div = document.createElement('div');
    div.classList.add('message',status);
    let content = `<h5>${data.user}</h5>
        <p>${data.msg}</p>`;
    div.innerHTML = content;
    chats.appendChild(div);
    chats.scrollTop = chats.scrollHeight;
} 

socket.on('message',(data)=>{
    appendMessage(data,'incoming');
});