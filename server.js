// Week 17 Mongo Server

// Requiring Node Packages
const express = require("express");
const mongojs = require("mongojs");
const path = require("path");

const logger = require("morgan");

const server = express();
// Telling the server to use morgan in dev
server.use(logger("dev"));
// Express settings
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static("public"));

// Declaring the Database Settings to be used
const databaseUrl = "homework";
const collections = ["workouts"];

// Delcaring the Database a variable "db" and passing in the settings
const db = mongojs(databaseUrl, collections);
db.on("error", error => {
    console.log("Database Error:", error);
});

// Telling the server to start
server.listen(3000, () => {
    console.log("App running on port 3000!");
})

// Routes 

//
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

server.get("/exercise?", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

server.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/stats.html"));
});