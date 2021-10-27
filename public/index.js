console.log("Asteroids!!");
const socket = io();
socket.emit("ping","pong!");
