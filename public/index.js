console.log("Asteroids!!");
const socket = io();
var player;
var drawable=false;
function setup(){
    socket.emit("ping","pong!");
    socket.emit("init",{});
    socket.once("init-ripple",(arg)=>{
        console.log(arg);
        player = new Player(socket, createVector(arg.x,arg.y),createVector(arg.dirX,arg.dirY));
        console.log(player);
        drawable=true;
    });
    createCanvas(400,400);

}
function draw(){
    background(0);
    if(drawable){
        player.update();
        player.show();
    }
}
