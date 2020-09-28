// Week 17 Mongo Server

// Requiring Node Packages
const express = require("express");
const mongojs = require("mongojs");
const path = require("path");
const mongoose = require("mongoose");


const logger = require("morgan");
// Requiring the Models form the default index.js file that is exporting the Model from the Workout.js File
const db = require("./models");
// Assigning the express server to the server variable
const server = express();
// Telling the server to use morgan in dev
server.use(logger("dev"));

// Express settings
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static("public"));

// Requiring Routes
require("./routes/api-routes")(server);
require("./routes/html-routes")(server);

// Declaring the Database Settings to be used
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// Telling the server to start
server.listen(3000, () => {
    console.log("App running on port 3000!");
});