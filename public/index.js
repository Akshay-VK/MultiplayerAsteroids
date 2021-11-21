console.log("Asteroids!!");
const socket = io();
socket.emit("ping","pong!");
socket.emit("init",{});
socket.once("init-ripple",(arg)=>{
    console.log(arg);
});

