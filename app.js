const express = require("express")

const socket = require("socket.io")

const app = express();

app.use(express.static);

let port = 5000;
let server = app.listen(port, () => {
    console.log(`Server is running on ${port}`)
});

let io = socket(server);
io.on("connection", (socket) => {

    console.log(`Connected to the server`);


    socket.on("beginPath", (data) => {

    })
    socket.on("drawStroke", (data) => {
        io.socket.emit("drawStroke", data);
    })

    socket.on("reduUndo", (data)=>{
        io.socket.emit("reduUndo", data);
    })
})

