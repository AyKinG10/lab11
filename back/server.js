const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const routes = require("./routes");
const db = require("./config/connection");
const cors = require("cors");
const morgan = require("morgan");
const redis = require("redis");
const myMiddleware = require("./middleware");

const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("updateTaskStatus", (data) => {
    console.log("Task status updated:", data);
    io.emit("taskStatusUpdated", data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;

  client.get(key, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(data);
    } else {
      next();
    }
  });
};


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(myMiddleware);
app.use(routes);
app.use('/api/tasks', require('./routes/tasks'));

server.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
