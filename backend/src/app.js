const express = require("express");
const { conn } = require("./utils/db");
const mongoose = require("mongoose");
const connectToDB = require("./utils/db");
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectToDB();

  console.log("server is up and running on port: ", port);
});
