// Week 17 Mongo Server

// Requiring Node Packages
const express = require("express");
const mongojs = require("mongojs");
const path = require("path");
const mongoose = require("mongoose");

const logger = require("morgan");

const db = require("./models");

const server = express();
// Telling the server to use morgan in dev
server.use(logger("dev"));
// Express settings
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static("public"));

// Declaring the Database Settings to be used
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });



// API Routes

// 
server.get("/api/workouts/:id", (req, res) => {
    db.Workout.find({}).then((workouts) => {
        return res.json(workouts);
    })
    .catch(err => {
        res.json(err);
    });
});

server.get("/api/workouts(/range)?", (req, res) => {
    db.Workout.find({})
    .then((workouts) => {
        return res.json(workouts);
    })
    .catch(err => {
        res.json(err)
    });
});

server.put("/api/workouts/:id", (req, res) => {
    const { type, name, duration } = req.body;
    const { id } = req.params;
    if (type === "cardio") {
        const { distance } = req.body;
        db.Workout.update({_id: mongojs.ObjectId(id)}, {day: Date.now(), $push: {exercises: [{type, name, duration, distance, weight: 0}]}})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    } else if (type === "resistance")
})


server.post("/api/workouts", (req, res) => {
    db.Workout.create({
        day: Date.now()
    }).then(workout => {
        res.json(workout);
        console.log("Heyllo")
    }).catch(err => {
        res.json(err);
    });
});

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


// Telling the server to start
server.listen(3000, () => {
    console.log("App running on port 3000!");
});