const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const cors = require("cors");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");

const { PORT, MONGODB_URI, NODE_ENV, ORIGIN } = require("./config");

const app = express();

// app.use(bodyParser.json());
// app.use(
//   cors({
//     credentials: true,
//     origin: ORIGIN,
//     optionsSuccessStatus: 200,
//   })
// );

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

if(NODE_ENV != 'test'){
  app.listen(PORT, () => {
    console.log(PORT);
    console.log(`Server is running on port ${PORT}`);
  });
}


module.exports = app;