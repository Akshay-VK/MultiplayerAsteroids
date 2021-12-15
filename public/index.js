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
        player.drawOthers();
        rectMode(CENTER);
        noFill();
        strokeWeight(2);
        stroke(0,255,0);
        rect(-player.pos.x+(width/2),-player.pos.y+(height/2),gameW,gameH);
        rectMode(CORNER);
    }
}
socket.on("update-ripple",(arg)=>{if(drawable){player.updateState(arg);}});