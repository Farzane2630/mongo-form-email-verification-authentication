const express = require("express");
const connectToDB = require("./utils/db");
const authRoutes = require("./routes/auth.route");
const cors = require("cors")
const app = express();

// Set Middlewares
app.use(express.json())
app.use(cors())

// Port
const port = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRoutes)

// Listen
app.listen(port, () => {
  connectToDB();

  console.log("server is up and running on port: ", port);
});
