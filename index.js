const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");

app.use(express.static(path.resolve("./public")));

const io = new Server(server);

io.on("connection",(socket)=>{
    socket.on("user-message",(message)=>{
        console.log("A new user message:-",message);
        io.emit("message",message)
    })
    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id);
    })
})

app.get("/",(req,res)=>{
    return res.sendFile("/public/index.html")
})

const port = 2000;
server.listen(port,()=> console.log(`http://localhost:${port}`));