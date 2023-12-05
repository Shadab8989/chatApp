const express = require("express"); //access
const socket = require("socket.io");

const app = express(); //initialize and server ready

app.use(express.static(__dirname));

let port = process.env.port || 3000;
let server = app.listen(port, () => {
	console.log("Listening to port" + port);
});

let io = socket(server);

io.on("connection",(socket) =>{
    socket.on("message",(data) =>{
        io.sockets.emit("message",data);
    })
})