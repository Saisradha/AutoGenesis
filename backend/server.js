require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("generate-project", (data) => {
        console.log("PROJECT PROMPT:");
        console.log(data.prompt);

        socket.emit("generation-status", {
            message: "AI generation started...",
        });
    });

    socket.on("disconnect", () => {
        console.log("Disconnected");
    });
});

app.get("/", (req, res) => {
    res.send("AutoGenesis Backend Running");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});