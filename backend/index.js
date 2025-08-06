const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();


app.get("/", (req, res) => {
  res.send("Hello from Node API server");
});

mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
      console.log("Server running at port 3000");
    });
  })
  .catch((error) => {
    console.log("connection failed", error);
    process.exit(1)
  });
