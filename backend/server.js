import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// import { json } from 'body-parser';
import * as http from "http";
import { Server } from "socket.io";
//const path = require('path');

import Chat from "./models/chatModel.js";
import router from "./routes.js";


// Create Express app

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://192.168.101.10:8080", // Replace with your frontend URL  and origin: "*" for all
    methods: ["GET", "POST"],
  },
});
const PORT = 3000;

// Middleware
app.use(cors({ origin: "http://192.168.101.10:8080", methods: ["GET", "POST"] })); // Replace with your frontend URL
app.use(express.json());
//app.use(express.static(path.join(__dirname, 'frontend/public')));

app.get("/", (req, res) => {
  res.send("Server is ready...");
});

// Routes
app.use("/", router);

// Socket.IO
io.on("connection", (socket) => {
  const userEmail = socket.handshake.query.userEmail;
  console.log("New client connected:", userEmail);

  socket.on("sendMessage", async (message) => {
    // Save the message to the database
    const chat = new Chat({
      sender: userEmail,
      recipient: message.recipient,
      message: message.message,
    });
    await chat.save();
    // Broadcast the message to the intended recipient
    io.emit("receiveMessage", {
      sender: userEmail,
      message: message.message,
      recipient: message.recipient,
    });
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected:", userEmail);
  });
});

// Connect to MongoDB
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
