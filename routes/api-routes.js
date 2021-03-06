const mongojs = require("mongojs");

export default (server) => {
    // API Routes

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
}
