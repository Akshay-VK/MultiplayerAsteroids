import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.static('public'));
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("ping", (arg) => {
    console.log(arg); // world
  });
  socket.on("init",(arg)=>{
    io.to(socket.id).emit("init-ripple",{
      x:Math.floor(Math.random()*400-200),
      y:Math.floor(Math.random()*400-200),
      dirX:1,
      dirY:0
    });
  });
  socket.on("beat",(arg)=>{
    //
  });
});

httpServer.listen(process.env.port||3000);
console.log(`Server started at port ${process.env.port||3000}`);
