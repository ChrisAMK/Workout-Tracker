const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    
    day: {
        type: Date,
        default: Date.now()
    },

    exercises: [{
        type: {type: String},
        name: {type: String},
        duration: {type: Number},
        distance: {type: Number},
        weight: {type: Number},
        reps: {type: Number},
        sets: {type: Number},
    }]
},
{
    toJSON: {
        // include all the virtual properties that have been set when the data is requested
        virtuals: true
    }
}
);

WorkoutSchema.virtual("totalDuration").get(function() {
    // Reduce as up all the values in the exercises array and returns them to the virtual property
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

WorkoutSchema.virtual("totalPounds").get(function() {
    return this.exercise.reduce((total, exercise) => {
        return total + exercise.weight;
    }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout