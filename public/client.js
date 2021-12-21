const socket = io('http://localhost:8000');
const from =document.getElementById('send-container');
const messageInput =document.getElementById('messageInp');
const messageContainer = document.querySelector("container");

const append = (message,position) =>{
 const messageElement = document.createElement('div')
 messageElement.innerText = message
 messageElement.classList.add('message')
 messageElement.classList.add(position);
 messageContainer.append(messageElement);
}


const name = prompt('enter name');
socket.emit('new-user-joined',name)

socket.on('user-joied',name => {
    console.log(name)
    append('${name} join','right')
})
