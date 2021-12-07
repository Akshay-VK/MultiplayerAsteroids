console.log("Asteroids!!");
const socket = io();
var player;
var drawable=false;
var gameW=0;
var gameH=0;
function setup(){
    socket.emit("ping","pong!");
    socket.emit("init",{});
    socket.once("init-ripple",(arg)=>{
        console.log(arg);
        gameW=arg.width;
        gameH=arg.height;
        player = new Player(socket, createVector(arg.x,arg.y),createVector(arg.dx,arg.dy),gameW,gameH);
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
        player.ping();
    }
}
socket.on("update-ripple",(arg)=>{if(drawable){player.drawOthers(arg);}});