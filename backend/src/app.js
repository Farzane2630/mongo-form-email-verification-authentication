const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectToDB = require("./utils/db");
const authRoutes = require("./routes/auth.route");
const postRoutes = require("./routes/post.route");

const app = express();

// Set Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Port
const port = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Listen
app.listen(port, () => {
  connectToDB();

  console.log("server is up and running on port: ", port);
});
