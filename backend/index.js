const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const globalExerciseRoutes = require("./routes/globalExerciseRoutes")
const exerciseRoutes = require("./routes/exerciseRoutes")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express();


app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000",
  credentials:true
}))
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello from Node API server");
});
app.use("/api/auth", authRoutes)
app.use("/api/clients", clientRoutes)
app.use("/api/globalExercise", globalExerciseRoutes)
app.use("/api/exercises", exerciseRoutes)

mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => {
    console.log("connected to database");
    app.listen(5000, () => {
      console.log("Server running at port 3000");
    });
  })
  .catch((error) => {
    console.log("connection failed", error);
    process.exit(1)
  });
