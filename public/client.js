const socket = io();
// const from =document.getElementById('send-container');
// const messageInput =document.getElementById('messageInp');
var messageContainer = document.querySelector("container");

// const append = (message,position) =>{
//  const messageElement = document.createElement('div'); 
//  messageElement.innerText = message;
//  messageElement.classList.add('message');
//  messageElement.classList.add(position);
//  messageContainer.append(messageElement);
// }

function userjoin(name, status){
    const messageElement = document.createElement('div'); 
     messageElement.classList.add('user-join');
     const content ='<p><b>${name}</b>${status} the chat</p>';
     messageElement.innerHTML=content;
     messageContainer.appendChild(div)

}


const name = prompt('enter name');
socket.emit('new-user-joined',name)

socket.on('user-joied',name => {
    userjoin(name,'joined');
   
})
