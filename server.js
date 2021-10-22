import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.static('public'));
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(process.env.port||3000);
console.log(`Server started at port ${process.env.port||3000}`);
