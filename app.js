const express = require("express");
const mongoose = require("mongoose");

const moviesRoutes = require("./routes/movies-route");
const userRoutes = require("./routes/users-route");

const app = express();
const { credentails } = require('./credentials')

const MONGO_ATLAS_PW = process.env.MONGO_ATLAS_PW || credentails.MONGO_ATLAS_PW;

mongoose.connect(
  "mongodb+srv://jeevan:" + MONGO_ATLAS_PW + "@moviedb.cka3x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/movies", moviesRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
