console.log("Asteroids!!");
const socket = io();
function setup(){
    socket.emit("ping","pong!");
    socket.emit("init",{});
    socket.once("init-ripple",(arg)=>{
        console.log(arg);
    });
    createCanvas(400,400);
}
function draw(){
    background(0);
}
