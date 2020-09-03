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

// Declaring the Database Settings to be used
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


// API Routes //

// This API route handles when the server recieves a get Request at /api/workouts/:id
server.get("/api/workouts/:id", (req, res) => {
    // This function is accessing the db variable which contains the Workout Constructer and then invokes the .find function which
    // Queries the database to look for all workouts. Once the query completes we assign the result as workouts and then return
    // as a response to the client as JSON
    db.Workout.find({}).then((workouts) => {
        return res.json(workouts);
    })
    // If there is an error in querying the database it is caught and then returned to the client as JSON
    .catch(err => {
        res.json(err);
    });
});

// This API route handles wheen the server recieves a get Request at /api/workouts(/range)?
server.get("/api/workouts(/range)?", (req, res) => {
    // This function is queries the database for all workouts and returns then as JSON
    db.Workout.find({})
    .then((workouts) => {
        return res.json(workouts);
    })
    // If there is an Error we return it as Json to the user
    .catch(err => {
        res.json(err)
    });
});

// This API route handles the PUT request at the /api/workouts/:id route
server.put("/api/workouts/:id", (req, res) => {
    // First off we are deconstruction the req.body by extracting the type, name and duration properties out instead of typing
    // const type = req.body etc etc, same thing for id and req.params
    const { type, name, duration } = req.body;
    const { id } = req.params;
    // If the user selects cardio workout then we have different information to update, so an if statement is appropriate or Switch Case
    if (type === "cardio") {
        const { distance } = req.body;
        // Here we are using the update method in mongoose to update the workout in the way that we want to add more exercises
        // to the exercises array so we use Push
        db.Workout.update({_id: mongojs.ObjectId(id)}, {day: Date.now(), $push: {exercises: [{type, name, duration, distance, weight: 0}]}})
        .then(workout => {
            // The result of this query is then returned to the user as a JSON response
            res.json(workout);
        })
        // If there is an error we return to client
        .catch(err => {
            res.json(err);
        });
    // this is for when the user chooses a resistance workout to add, it is the same as the cardio just with different fields
    } else if (type === "resistance") {
        const { weight, reps, sets } = req.body;
        db.Workout.update({_id: mongojs.ObjectId(id)}, {day: Date.now(), $push: {exercises: [{type, name, duration, weight, reps, sets}]}})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    };
});

// This is the API route for a POST request at the /api/workouts route
server.post("/api/workouts", (req, res) => {
    // Here we are creating a whole new workout in the database with the create mongoose method
    db.Workout.create({
        // we enter the day as the current Date, but leave the workouts empty because we push them into the database with the PUT requests!
        day: Date.now()
    }).then(workout => {
        res.json(workout);
    }).catch(err => {
        res.json(err);
    });
});

// HTML Routes
// Sends the index.html file to the user when on the websites main page
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Sends the exercise.html file to the user when on the browser sends a /exercise? get request
server.get("/exercise?", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

// Sends the stats.html file to the user when on the browser sends a /stats get request
server.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/stats.html"));
});

// Telling the server to start
server.listen(3000, () => {
    console.log("App running on port 3000!");
});