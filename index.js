const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
var http = require("http");
const { Server } = require("socket.io");

const orderRoutes = require("./routes/orderRoutes");

const { PORT, MONGODB_URI, NODE_ENV, ORIGIN } = require("./config");

const app = express();

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
    data: null,
  });
});

app.use("/api/v1/order_service", orderRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

const server = http.createServer(app);
// let server;
if (NODE_ENV != "test") {
  server.listen(PORT, () => {
    console.log(PORT);
    console.log(`Server is running on port ${PORT}`);
  });
}

// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
//   pingTimeout: 60000,
// });

const io = new Server(9000, {
  cors: {
    origin: "*",
  },
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("newOrder", (orderDetails) => {
    // Handle new order logic
    console.log("New order received:", orderDetails);

    // Broadcast new order to vendor dashboard
    io.emit("newOrder", orderDetails);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

module.exports = app;
