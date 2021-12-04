import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.static('public'));
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

function makePlayer(id,x,y,dx,dy){
  return {
    id:id,
    x:x,
    y:y,
    dx:dx,
    dy:dy
  }
}

var players = {},WIDTH=400,HEIGHT=400;

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("ping", (arg) => {
    console.log(arg); // world
  });
  socket.on("init",(arg)=>{
    var player = makePlayer(socket.id,Math.floor(Math.random()*400-200),Math.floor(Math.random()*400-200),1,0);
    io.to(socket.id).emit("init-ripple",{
      x:player.x,
      y:player.y,
      dx:1,
      dy:0,
      angle:0,
      width:WIDTH,
      height:HEIGHT
    });
    players[`${socket.id}`]=player;
  });
  socket.on("beat",(arg)=>{
    players[`${socket.id}`]={x:arg.x,y:arg.y,dx:arg.dx,dy:arg.dy,angle:arg.angle};
    console.log(players);
  });
  io.to(socket.id).emit("update-ripple",players);
});

httpServer.listen(process.env.port||3000);
console.log(`Server started at port ${process.env.port||3000}`);
