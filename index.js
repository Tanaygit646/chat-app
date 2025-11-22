const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(express.static(path.resolve("./public")));

const io = new Server(server);

io.on("connection", (socket) => {

    socket.on("set-username", (name) => {
        socket.username = name;
    });

    socket.on("user-message", (message) => {
        const finalMsg = `${message.username}: ${message.text}`;
        io.emit("message", finalMsg);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });

});

app.get("/", (req, res) => {
    return res.sendFile(path.resolve("./public/index.html"));
});

const port = 7000;
server.listen(port, () => console.log(`http://localhost:${port}`));
